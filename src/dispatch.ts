import { IsAny, Promisify } from '@properly-typed/utils';
import { DispatchOptions } from 'vuex';
import { CustomAction, CustomActions } from './primitives/custom-actions';

type OptionsWithRoot<V extends true | false> = V extends true
  ? Omit<DispatchOptions, 'root'> & { root: true }
  : Omit<DispatchOptions, 'root'> & { root?: false };

type LocalParameters<
  Action extends CustomAction,
> = Parameters<Action>[0] extends infer Payload
  ? IsAny<Payload> extends true
    ? [payload: Payload, options?: OptionsWithRoot<false>]
    : Payload extends undefined
      ? [payload?: Payload, options?: OptionsWithRoot<false>]
      : [payload: Payload, options?: OptionsWithRoot<false>]
  : never;

type LocalParametersWithType<
  T extends keyof Actions,
  Actions extends CustomActions,
> = Parameters<Actions[T]>[0] extends infer Payload
  ? IsAny<Payload> extends true
    ? [payloadWithType: { type: T; payload: Payload }, options?: OptionsWithRoot<false>]
    : Payload extends undefined
      ? [payloadWithType?: { type: T; payload: Payload }, options?: OptionsWithRoot<false>]
      : [payloadWithType: { type: T; payload: Payload }, options?: OptionsWithRoot<false>]
  : never;

type GlobalParameters<
  RootAction extends CustomAction,
> = Parameters<RootAction>[0] extends infer Payload
  ? [payload: Payload, options: OptionsWithRoot<true>]
  : never;

type GlobalParametersWithType<
  T extends keyof RootActions,
  RootActions extends CustomActions,
> = Parameters<RootActions[T]>[0] extends infer Payload
  ? [payload: { type: T; payload: Payload }, options: OptionsWithRoot<true>]
  : never;

type UntypedDispatch = {
  // Untyped action
  (
    type: string,
    payload?: unknown,
    options?: DispatchOptions,
  ): Promise<unknown>;
  // Untyped action with type in payload
  (
    payloadWithType: {
      type: string;
      payload?: unknown;
    },
    options?: DispatchOptions,
  ): Promise<unknown>;
};

type GlobalDispatch<RootActions extends CustomActions> = {
  // Global Action
  <T extends keyof RootActions>(
    type: T,
    ...parameters: GlobalParameters<RootActions[T]>
  ): Promisify<ReturnType<RootActions[T]>>;
  // Global Action with type in payload
  <T extends keyof RootActions>(
    ...parameters: GlobalParametersWithType<T, RootActions>
  ): Promisify<ReturnType<RootActions[T]>>;
};

type LocalDispatch<Actions extends CustomActions> = {
  // Local Action
  <T extends keyof Actions>(
    type: T,
    ...parameters: LocalParameters<Actions[T]>
  ): Promisify<ReturnType<Actions[T]>>;
  // Local Action with type in payload
  <T extends keyof Actions>(
    ...parameters: LocalParametersWithType<T, Actions>
  ): Promisify<ReturnType<Actions[T]>>;
};

type LocalAndGlobalDispatch<
  Actions extends CustomActions,
  RootActions extends CustomActions,
> = {
  // Global Action
  <T extends keyof RootActions>(
    type: T,
    ...parameters: GlobalParameters<RootActions[T]>
  ): Promisify<ReturnType<RootActions[T]>>;
  // Global Action with type in payload
  <T extends keyof RootActions>(
    ...parameters: GlobalParametersWithType<T, RootActions>
  ): Promisify<ReturnType<RootActions[T]>>;

  // Local Action
  <T extends keyof Actions>(
    type: T,
    ...parameters: LocalParameters<Actions[T]>
  ): Promisify<ReturnType<Actions[T]>>;
  // Local Action with type in payload
  <T extends keyof Actions>(
    ...parameters: LocalParametersWithType<T, Actions>
  ): Promisify<ReturnType<Actions[T]>>;
};

export type TypedDispatch<
  Actions extends CustomActions | undefined,
  RootActions extends CustomActions,
> = IsAny<Actions> extends true
  ? IsAny<RootActions> extends true
    ? UntypedDispatch
    : GlobalDispatch<RootActions>
  : Actions extends CustomActions
    ? IsAny<RootActions> extends true
      ? LocalDispatch<Actions>
      : LocalAndGlobalDispatch<Actions, RootActions>
    : never;
