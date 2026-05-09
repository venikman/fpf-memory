const oneHourMs = 60 * 60 * 1000;
const twoHoursMs = 2 * oneHourMs;

export const fastTrackCheckboxLabel = 'Enable TPR review/merge timer';
export const reviewRequestMarker = '<!-- tpr-fast-track:review-requested';
export const mergeAttemptMarker = '<!-- tpr-fast-track:merge-attempted';

const blockedMarkerPrefix = '<!-- tpr-fast-track:merge-blocked:';
const reviewSignalStates = new Set(['APPROVED', 'COMMENTED', 'CHANGES_REQUESTED']);
const blockingReviewState = 'CHANGES_REQUESTED';
const approvingReviewState = 'APPROVED';
const trustedAuthorAssociations = new Set(['OWNER', 'MEMBER', 'COLLABORATOR']);

type ReviewState = 'APPROVED' | 'COMMENTED' | 'CHANGES_REQUESTED' | 'DISMISSED' | string;

export type ChecksState = {
  state: 'pass' | 'pending' | 'fail';
  summary: string;
};

export type ReviewSummary = {
  author: string;
  authorAssociation: string;
  commitId: string | null;
  submittedAt: string;
  state: ReviewState;
};

export type IssueCommentSummary = {
  body: string;
};

export type PullRequestFastTrackState = {
  author: string;
  authorAssociation: string;
  body: string | null;
  checks: ChecksState;
  comments: IssueCommentSummary[];
  draft: boolean;
  headSha: string;
  number: number;
  reviewWindowStartedAt: string;
  reviews: ReviewSummary[];
};

export type FastTrackAction =
  | {
      type: 'request-review';
      marker: string;
      message: string;
    }
  | {
      type: 'merge';
      marker: string;
      message: string;
    }
  | {
      type: 'comment-blocked';
      marker: string;
      message: string;
    };

type GitHubPullRequest = {
  author_association: string;
  body: string | null;
  created_at: string;
  draft: boolean;
  head: {
    sha: string;
  };
  node_id: string;
  number: number;
  user: {
    login: string;
  };
};

type GitHubReview = {
  author_association: string;
  commit_id: string | null;
  state: string;
  submitted_at: string | null;
  user: {
    login: string;
  } | null;
};

type GitHubCommit = {
  commit: {
    author?: {
      date?: string;
    };
    committer?: {
      date?: string;
    };
  };
};

type GitHubIssueComment = {
  body: string | null;
};

type GitHubCheckRun = {
  conclusion: string | null;
  name: string;
  status: string;
};

export type GitHubCombinedStatus = {
  state: 'success' | 'failure' | 'error' | 'pending';
  statuses: unknown[];
};

export type GitHubCheckRunSummary = GitHubCheckRun;

type PullRequestContext = {
  checks: ChecksState;
  comments: IssueCommentSummary[];
  pr: GitHubPullRequest;
  reviewWindowStartedAt: string;
  reviews: ReviewSummary[];
};

class GitHubClient {
  constructor(
    private readonly token: string,
    private readonly owner: string,
    private readonly repo: string,
  ) {}

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const response = await fetch(`https://api.github.com${path}`, {
      method,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(`${method} ${path} failed with ${response.status}: ${responseBody}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  async paginate<T>(path: string): Promise<T[]> {
    const separator = path.includes('?') ? '&' : '?';
    const firstPagePath = `${path}${separator}per_page=100`;
    const items: T[] = [];
    let nextPath: string | undefined = firstPagePath;

    while (nextPath) {
      const response = await fetch(`https://api.github.com${nextPath}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${this.token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`GET ${nextPath} failed with ${response.status}: ${responseBody}`);
      }

      items.push(...((await response.json()) as T[]));
      nextPath = parseNextPath(response.headers.get('link'));
    }

    return items;
  }

  async graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = (await response.json()) as { data?: T; errors?: { message: string }[] };

    if (!response.ok || result.errors?.length) {
      const messages = result.errors?.map((error) => error.message).join('; ') ?? response.statusText;
      throw new Error(`GraphQL request failed: ${messages}`);
    }

    if (!result.data) {
      throw new Error('GraphQL request returned no data.');
    }

    return result.data;
  }

  repoPath(path: string): string {
    return `/repos/${this.owner}/${this.repo}${path}`;
  }
}

export function isFastTrackEnabled(body: string | null | undefined): boolean {
  if (!body) {
    return false;
  }

  return new RegExp(`-\\s*\\[[xX]\\]\\s*${escapeRegExp(fastTrackCheckboxLabel)}`).test(body);
}

export function planTprFastTrackActions(
  state: PullRequestFastTrackState,
  now = new Date(),
): FastTrackAction[] {
  if (!isFastTrackEnabled(state.body) || state.draft) {
    return [];
  }

  const actions: FastTrackAction[] = [];
  const reviewWindowStartedAt = new Date(state.reviewWindowStartedAt);
  const ageMs = now.getTime() - reviewWindowStartedAt.getTime();
  const reviewRequestHeadMarker = markerForHead(reviewRequestMarker, state.headSha);
  const mergeAttemptHeadMarker = markerForHead(mergeAttemptMarker, state.headSha);

  if (!trustedAuthorAssociations.has(state.authorAssociation)) {
    return maybeBlockedAction(
      state,
      'untrusted-author',
      'TPR fast-track is enabled, but this automation only runs for OWNER, MEMBER, or COLLABORATOR PR authors.',
    );
  }

  const hasReview = hasCurrentHeadReviewSignal(state);

  if (ageMs >= oneHourMs && !hasReview && !hasCommentMarker(state.comments, reviewRequestHeadMarker)) {
    actions.push({
      type: 'request-review',
      marker: reviewRequestHeadMarker,
      message: `${reviewRequestHeadMarker}
@codex review

TPR fast-track timer reached 1 hour without a trusted non-author review on the current head commit. Please review this PR. The 2-hour merge path still requires passing checks, a trusted non-author approval on the current head commit, and no requested changes.`,
    });
  }

  if (ageMs < twoHoursMs) {
    return actions;
  }

  if (hasBlockingChangeRequest(state)) {
    actions.push(
      ...maybeBlockedAction(
        state,
        'changes-requested',
        'TPR fast-track reached 2 hours, but merge is blocked because a trusted non-author reviewer requested changes and has not approved since.',
      ),
    );
    return actions;
  }

  if (!hasCurrentHeadApproval(state)) {
    actions.push(
      ...maybeBlockedAction(
        state,
        'no-current-head-approval',
        'TPR fast-track reached 2 hours, but merge is blocked until at least one trusted non-author approval exists on the current head commit.',
      ),
    );
    return actions;
  }

  if (state.checks.state !== 'pass') {
    actions.push(
      ...maybeBlockedAction(
        state,
        `checks-${state.checks.state}`,
        `TPR fast-track reached 2 hours, but merge is blocked because checks are ${state.checks.state}: ${state.checks.summary}`,
      ),
    );
    return actions;
  }

  if (!hasCommentMarker(state.comments, mergeAttemptHeadMarker)) {
    actions.push({
      type: 'merge',
      marker: mergeAttemptHeadMarker,
      message: `${mergeAttemptHeadMarker}
TPR fast-track reached 2 hours with a trusted non-author approval on the current head commit, no requested changes, and passing checks. Auto-merge has been enabled.`,
    });
  }

  return actions;
}

async function main(): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;

  if (!token) {
    throw new Error('GITHUB_TOKEN is required.');
  }

  if (!repository?.includes('/')) {
    throw new Error('GITHUB_REPOSITORY must be set to owner/repo.');
  }

  const [owner, repo] = repository.split('/') as [string, string];
  const client = new GitHubClient(token, owner, repo);
  const prNumbers = await resolvePrNumbers(client);

  if (prNumbers.length === 0) {
    console.log('No PRs to process.');
    return;
  }

  let failedCount = 0;
  for (const prNumber of prNumbers) {
    try {
      await processPullRequest(client, prNumber);
    } catch (error) {
      failedCount += 1;
      console.error(`#${prNumber}: failed to process: ${String(error)}`);
    }
  }

  if (failedCount > 0) {
    throw new Error(`TPR fast-track failed to process ${failedCount} PR(s).`);
  }
}

async function resolvePrNumbers(client: GitHubClient): Promise<number[]> {
  const requestedPr = process.env.TPR_FAST_TRACK_PR?.trim();

  if (requestedPr) {
    const parsed = Number(requestedPr);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error(`TPR_FAST_TRACK_PR must be a positive integer, got ${requestedPr}.`);
    }

    return [parsed];
  }

  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (eventPath) {
    const event = await Bun.file(eventPath).json().catch(() => undefined);
    const eventPrNumber = event?.pull_request?.number;
    if (typeof eventPrNumber === 'number') {
      return [eventPrNumber];
    }
  }

  const openPrs = await client.paginate<GitHubPullRequest>(client.repoPath('/pulls?state=open'));
  return openPrs.map((pr) => pr.number);
}

async function processPullRequest(client: GitHubClient, prNumber: number): Promise<void> {
  const context = await loadPullRequestContext(client, prNumber);
  const state: PullRequestFastTrackState = {
    author: context.pr.user.login,
    authorAssociation: context.pr.author_association,
    body: context.pr.body,
    checks: context.checks,
    comments: context.comments,
    draft: context.pr.draft,
    headSha: context.pr.head.sha,
    number: context.pr.number,
    reviewWindowStartedAt: context.reviewWindowStartedAt,
    reviews: context.reviews,
  };
  const actions = planTprFastTrackActions(state);

  if (actions.length === 0) {
    console.log(`#${prNumber}: no action.`);
    return;
  }

  for (const action of actions) {
    console.log(`#${prNumber}: ${action.type}`);

    if (action.type === 'request-review' || action.type === 'comment-blocked') {
      await postIssueComment(client, prNumber, action.message);
      continue;
    }

    await enableAutoMerge(client, context.pr);
    await postIssueComment(client, prNumber, action.message);
  }
}

async function loadPullRequestContext(client: GitHubClient, prNumber: number): Promise<PullRequestContext> {
  const pr = await client.request<GitHubPullRequest>('GET', client.repoPath(`/pulls/${prNumber}`));
  const [reviews, comments, checks, reviewWindowStartedAt] = await Promise.all([
    loadReviews(client, prNumber),
    loadIssueComments(client, prNumber),
    loadChecks(client, pr.head.sha),
    loadHeadCommitDate(client, pr.head.sha),
  ]);

  return {
    checks,
    comments,
    pr,
    reviewWindowStartedAt,
    reviews,
  };
}

async function loadReviews(client: GitHubClient, prNumber: number): Promise<ReviewSummary[]> {
  const reviews = await client.paginate<GitHubReview>(client.repoPath(`/pulls/${prNumber}/reviews`));
  return reviews
    .filter((review) => review.user?.login && review.submitted_at)
    .map((review) => ({
      author: review.user!.login,
      authorAssociation: review.author_association,
      commitId: review.commit_id,
      submittedAt: review.submitted_at!,
      state: review.state,
    }));
}

async function loadHeadCommitDate(client: GitHubClient, sha: string): Promise<string> {
  const commit = await client.request<GitHubCommit>('GET', client.repoPath(`/commits/${sha}`));
  const date = commit.commit.committer?.date ?? commit.commit.author?.date;

  if (!date) {
    throw new Error(`Could not resolve commit date for ${sha}.`);
  }

  return date;
}

async function loadIssueComments(client: GitHubClient, prNumber: number): Promise<IssueCommentSummary[]> {
  const comments = await client.paginate<GitHubIssueComment>(client.repoPath(`/issues/${prNumber}/comments`));
  return comments.map((comment) => ({ body: comment.body ?? '' }));
}

async function loadChecks(client: GitHubClient, sha: string): Promise<ChecksState> {
  const [combinedStatus, checkRuns] = await Promise.all([
    client.request<GitHubCombinedStatus>('GET', client.repoPath(`/commits/${sha}/status`)),
    loadCheckRuns(client, sha),
  ]);
  return summarizeChecks(combinedStatus, checkRuns);
}

async function loadCheckRuns(client: GitHubClient, sha: string): Promise<GitHubCheckRun[]> {
  const checkRuns: GitHubCheckRun[] = [];
  let page = 1;

  while (true) {
    const response = await client.request<{ check_runs: GitHubCheckRun[] }>(
      'GET',
      client.repoPath(`/commits/${sha}/check-runs?per_page=100&page=${page}`),
    );
    checkRuns.push(...response.check_runs);

    if (response.check_runs.length < 100) {
      return checkRuns;
    }

    page += 1;
  }
}

export function summarizeChecks(
  combinedStatus: GitHubCombinedStatus,
  checkRuns: GitHubCheckRunSummary[],
): ChecksState {
  const ciRun = checkRuns.find((run) => run.name === 'ci');

  if (!ciRun) {
    return { state: 'pending', summary: 'CI / ci check run not found' };
  }

  if (ciRun.status !== 'completed') {
    return { state: 'pending', summary: 'CI / ci is still running' };
  }

  if (ciRun.conclusion !== 'success') {
    return { state: 'fail', summary: `CI / ci concluded ${ciRun.conclusion ?? 'without a conclusion'}` };
  }

  if (combinedStatus.state === 'failure' || combinedStatus.state === 'error') {
    return { state: 'fail', summary: `combined commit status is ${combinedStatus.state}` };
  }

  if (combinedStatus.statuses.length > 0 && combinedStatus.state === 'pending') {
    return { state: 'pending', summary: 'combined commit status is pending' };
  }

  return { state: 'pass', summary: 'CI / ci and commit status evidence passed' };
}

async function postIssueComment(client: GitHubClient, prNumber: number, body: string): Promise<void> {
  await client.request('POST', client.repoPath(`/issues/${prNumber}/comments`), { body });
}

async function enableAutoMerge(client: GitHubClient, pr: GitHubPullRequest): Promise<void> {
  await client.graphql(
    `mutation EnablePullRequestAutoMerge($pullRequestId: ID!) {
      enablePullRequestAutoMerge(input: { pullRequestId: $pullRequestId, mergeMethod: SQUASH }) {
        pullRequest {
          number
        }
      }
    }`,
    { pullRequestId: pr.node_id },
  );
  console.log(`#${pr.number}: auto-merge enabled.`);
}

function hasCurrentHeadReviewSignal(state: PullRequestFastTrackState): boolean {
  return currentHeadTrustedNonAuthorReviews(state).some((review) => reviewSignalStates.has(review.state));
}

function hasBlockingChangeRequest(state: PullRequestFastTrackState): boolean {
  return latestTrustedNonAuthorDecisiveReviews(state).some((review) => review.state === blockingReviewState);
}

function hasCurrentHeadApproval(state: PullRequestFastTrackState): boolean {
  return latestTrustedNonAuthorDecisiveReviews(state).some(
    (review) => review.state === approvingReviewState && review.commitId === state.headSha,
  );
}

function currentHeadTrustedNonAuthorReviews(state: PullRequestFastTrackState): ReviewSummary[] {
  return latestTrustedNonAuthorReviews(state).filter((review) => review.commitId === state.headSha);
}

function latestTrustedNonAuthorDecisiveReviews(state: PullRequestFastTrackState): ReviewSummary[] {
  const latestByAuthor = new Map<string, ReviewSummary>();

  for (const review of state.reviews) {
    if (review.author === state.author || !trustedAuthorAssociations.has(review.authorAssociation)) {
      continue;
    }

    if (
      review.state !== approvingReviewState &&
      review.state !== blockingReviewState &&
      review.state !== 'DISMISSED'
    ) {
      continue;
    }

    const current = latestByAuthor.get(review.author);
    if (!current || new Date(review.submittedAt).getTime() > new Date(current.submittedAt).getTime()) {
      latestByAuthor.set(review.author, review);
    }
  }

  return Array.from(latestByAuthor.values()).filter((review) => review.state !== 'DISMISSED');
}

function latestTrustedNonAuthorReviews(state: PullRequestFastTrackState): ReviewSummary[] {
  const latestByAuthor = new Map<string, ReviewSummary>();

  for (const review of state.reviews) {
    if (review.author === state.author || !trustedAuthorAssociations.has(review.authorAssociation)) {
      continue;
    }

    const current = latestByAuthor.get(review.author);
    if (!current || new Date(review.submittedAt).getTime() > new Date(current.submittedAt).getTime()) {
      latestByAuthor.set(review.author, review);
    }
  }

  return Array.from(latestByAuthor.values()).filter((review) => review.state !== 'DISMISSED');
}

function hasCommentMarker(comments: IssueCommentSummary[], marker: string): boolean {
  return comments.some((comment) => comment.body.includes(marker));
}

function maybeBlockedAction(
  state: PullRequestFastTrackState,
  reason: string,
  message: string,
): FastTrackAction[] {
  const marker = `${blockedMarkerPrefix}${reason}:${state.headSha} -->`;

  if (hasCommentMarker(state.comments, marker)) {
    return [];
  }

  return [
    {
      type: 'comment-blocked',
      marker,
      message: `${marker}
${message}`,
    },
  ];
}

function markerForHead(markerPrefix: string, headSha: string): string {
  return `${markerPrefix}:${headSha} -->`;
}

function parseNextPath(linkHeader: string | null): string | undefined {
  if (!linkHeader) {
    return undefined;
  }

  const nextLink = linkHeader.split(',').find((link) => link.includes('rel="next"'));
  const urlMatch = nextLink?.match(/<https:\/\/api\.github\.com([^>]+)>/);
  return urlMatch?.[1];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (import.meta.main) {
  await main();
}
