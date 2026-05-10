import type {
  AppServiceOutcome,
  ExpandFpfCitationsCommand,
  InspectFpfAnchorCommand,
  InspectFpfNodeCommand,
  ReadFpfDocCommand,
} from '../commands/index.js';
import { runtimeError, success, validationError } from '../commands/index.js';
import type { RuntimeQueryPort } from '../ports/runtime-port.js';
import type {
  ExpandCitationsResult,
  InspectAnchorResult,
  InspectResult,
  ReadDocResult,
} from '../../core/types.js';

export class InspectAppService {
  constructor(private readonly runtime: RuntimeQueryPort) {}

  async inspect(
    command: InspectFpfNodeCommand,
  ): Promise<AppServiceOutcome<InspectResult>> {
    const selector = command.selector.trim();
    if (!selector) {
      return validationError('Inspect selector must not be empty', ['selector']);
    }

    try {
      return success(
        await this.runtime.inspect(
          selector,
          command.kind ?? 'auto',
          command.forceRefresh ?? false,
        ),
      );
    } catch (error) {
      return runtimeError(error);
    }
  }

  async readDoc(
    command: ReadFpfDocCommand,
  ): Promise<AppServiceOutcome<ReadDocResult>> {
    const selector = command.selector.trim();
    if (!selector) {
      return validationError('Read-doc selector must not be empty', ['selector']);
    }

    try {
      return success(
        await this.runtime.readDoc(selector, command.kind ?? 'auto', {
          mode: command.mode,
          maxChars: command.maxChars,
          forceRefresh: command.forceRefresh ?? false,
        }),
      );
    } catch (error) {
      return runtimeError(error);
    }
  }

  async inspectAnchor(
    command: InspectFpfAnchorCommand,
  ): Promise<AppServiceOutcome<InspectAnchorResult>> {
    const anchorId = command.anchorId.trim();
    if (!anchorId) {
      return validationError('Anchor id must not be empty', ['anchorId']);
    }

    try {
      return success(
        await this.runtime.inspectAnchor(anchorId, command.forceRefresh ?? false),
      );
    } catch (error) {
      return runtimeError(error);
    }
  }

  async expandCitations(
    command: ExpandFpfCitationsCommand,
  ): Promise<AppServiceOutcome<ExpandCitationsResult>> {
    if (command.citationIds.length === 0) {
      return validationError('At least one citation id is required', ['citationIds']);
    }

    try {
      return success(
        await this.runtime.expandCitations(
          command.citationIds,
          command.forceRefresh ?? false,
        ),
      );
    } catch (error) {
      return runtimeError(error);
    }
  }
}
