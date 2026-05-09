import { describe, expect, it } from '@rstest/core';

import {
  fastTrackCheckboxLabel,
  isFastTrackEnabled,
  mergeAttemptMarker,
  planTprFastTrackActions,
  reviewRequestMarker,
  summarizeChecks,
  type PullRequestFastTrackState,
} from '../scripts/tpr-fast-track';

const createdAt = '2026-05-09T10:00:00.000Z';
const headSha = 'abc123';
const reviewRequestHeadMarker = `${reviewRequestMarker}:${headSha} -->`;
const mergeAttemptHeadMarker = `${mergeAttemptMarker}:${headSha} -->`;

describe('TPR fast-track planner', () => {
  it('detects the opt-in checkbox only when checked', () => {
    expect(isFastTrackEnabled(`- [x] ${fastTrackCheckboxLabel}`)).toBe(true);
    expect(isFastTrackEnabled(`- [X] ${fastTrackCheckboxLabel}`)).toBe(true);
    expect(isFastTrackEnabled(`- [ ] ${fastTrackCheckboxLabel}`)).toBe(false);
  });

  it('requests Codex review after 1 hour without a non-author review', () => {
    const actions = planTprFastTrackActions(baseState(), new Date('2026-05-09T11:01:00.000Z'));

    expect(actions).toEqual([
      expect.objectContaining({
        marker: reviewRequestHeadMarker,
        type: 'request-review',
      }),
    ]);
  });

  it('does not request review twice', () => {
    const actions = planTprFastTrackActions(
      baseState({
        comments: [{ body: reviewRequestHeadMarker }],
      }),
      new Date('2026-05-09T11:01:00.000Z'),
    );

    expect(actions).toEqual([]);
  });

  it('blocks the 2-hour merge path until a current-head approval exists', () => {
    const actions = planTprFastTrackActions(baseState(), new Date('2026-05-09T12:01:00.000Z'));

    expect(actions.map((action) => action.type)).toEqual(['request-review', 'comment-blocked']);
    expect(actions[1]?.marker).toContain('no-current-head-approval');
  });

  it('blocks merge when the latest non-author review requests changes', () => {
    const actions = planTprFastTrackActions(
      baseState({
        reviews: [
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'APPROVED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'CHANGES_REQUESTED',
            submittedAt: '2026-05-09T10:40:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('changes-requested') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('does not count a dismissed latest review as an active review signal', () => {
    const actions = planTprFastTrackActions(
      baseState({
        comments: [{ body: reviewRequestHeadMarker }],
        reviews: [
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'APPROVED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'DISMISSED',
            submittedAt: '2026-05-09T10:40:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('no-current-head-approval') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('queues merge after 2 hours with current-head approval and passing checks', () => {
    const actions = planTprFastTrackActions(
      baseState({
        reviews: [
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'APPROVED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: mergeAttemptHeadMarker,
        type: 'merge',
      }),
    ]);
  });

  it('does not merge when the current-head review is only a comment', () => {
    const actions = planTprFastTrackActions(
      baseState({
        comments: [{ body: reviewRequestHeadMarker }],
        reviews: [
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'COMMENTED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('no-current-head-approval') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('does not let a later review comment clear a requested-changes block', () => {
    const actions = planTprFastTrackActions(
      baseState({
        reviews: [
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'CHANGES_REQUESTED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: headSha,
            state: 'COMMENTED',
            submittedAt: '2026-05-09T10:40:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('changes-requested') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('does not merge a new head from a stale approval on an older commit', () => {
    const actions = planTprFastTrackActions(
      baseState({
        comments: [{ body: reviewRequestHeadMarker }],
        reviews: [
          {
            author: 'reviewer',
            authorAssociation: 'MEMBER',
            commitId: 'old-sha',
            state: 'APPROVED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('no-current-head-approval') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('does not merge from an untrusted reviewer approval', () => {
    const actions = planTprFastTrackActions(
      baseState({
        comments: [{ body: reviewRequestHeadMarker }],
        reviews: [
          {
            author: 'outside-reviewer',
            authorAssociation: 'CONTRIBUTOR',
            commitId: headSha,
            state: 'APPROVED',
            submittedAt: '2026-05-09T10:20:00.000Z',
          },
        ],
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('no-current-head-approval') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('requests review for a new head even when an older head had a timer comment', () => {
    const actions = planTprFastTrackActions(
      baseState({
        comments: [{ body: `${reviewRequestMarker}:old-sha -->` }],
        reviewWindowStartedAt: '2026-05-09T11:00:00.000Z',
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: reviewRequestHeadMarker,
        type: 'request-review',
      }),
    ]);
  });

  it('blocks untrusted PR authors even when they opt in', () => {
    const actions = planTprFastTrackActions(
      baseState({
        authorAssociation: 'CONTRIBUTOR',
      }),
      new Date('2026-05-09T12:01:00.000Z'),
    );

    expect(actions).toEqual([
      expect.objectContaining({
        marker: expect.stringContaining('untrusted-author') as string,
        type: 'comment-blocked',
      }),
    ]);
  });

  it('treats the aggregate CI check as enough when advisory checks are still pending', () => {
    const checks = summarizeChecks(
      {
        state: 'success',
        statuses: [{}],
      },
      [
        {
          conclusion: 'success',
          name: 'ci',
          status: 'completed',
        },
        {
          conclusion: null,
          name: 'Cursor Bugbot',
          status: 'in_progress',
        },
      ],
    );

    expect(checks).toEqual({
      state: 'pass',
      summary: 'CI / ci and commit status evidence passed',
    });
  });

  it('allows GitHub Actions only repositories when CI passes and there are no legacy commit statuses', () => {
    const checks = summarizeChecks(
      {
        state: 'pending',
        statuses: [],
      },
      [
        {
          conclusion: 'success',
          name: 'ci',
          status: 'completed',
        },
      ],
    );

    expect(checks).toEqual({
      state: 'pass',
      summary: 'CI / ci and commit status evidence passed',
    });
  });

  it('keeps merge pending until the aggregate CI check is present', () => {
    const checks = summarizeChecks(
      {
        state: 'success',
        statuses: [{}],
      },
      [
        {
          conclusion: 'success',
          name: 'Vercel',
          status: 'completed',
        },
      ],
    );

    expect(checks).toEqual({
      state: 'pending',
      summary: 'CI / ci check run not found',
    });
  });
});

function baseState(overrides: Partial<PullRequestFastTrackState> = {}): PullRequestFastTrackState {
  return {
    author: 'author',
    authorAssociation: 'MEMBER',
    body: `- [x] ${fastTrackCheckboxLabel}`,
    checks: {
      state: 'pass',
      summary: 'ci passed',
    },
    comments: [],
    draft: false,
    headSha,
    number: 1,
    reviewWindowStartedAt: createdAt,
    reviews: [],
    ...overrides,
  };
}
