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

export type TypedDispatch<
  Actions extends CustomActions | undefined,
  RootActions extends CustomActions,
> = Actions extends CustomActions
  ? {
    // Global Action
    <T extends keyof RootActions = string>(
      type: T,
      ...parameters: GlobalParameters<RootActions[T]>
    ): Promisify<ReturnType<RootActions[T]>>;
    // Global Action with type in payload
    <T extends keyof RootActions = string>(
      ...parameters: GlobalParametersWithType<T, RootActions>
    ): Promisify<ReturnType<RootActions[T]>>;

    // Local Action
    <T extends keyof Actions = string>(
      type: T,
      ...parameters: LocalParameters<Actions[T]>
    ): Promisify<ReturnType<Actions[T]>>;
    // Local Action with type in payload
    <T extends keyof Actions = string>(
      ...parameters: LocalParametersWithType<T, Actions>
    ): Promisify<ReturnType<Actions[T]>>;

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
  } : {
    // Global Action
    <T extends keyof RootActions = string>(
      type: T,
      ...parameters: GlobalParameters<RootActions[T]>
    ): Promisify<ReturnType<RootActions[T]>>;
    // Global Action with type in payload
    <T extends keyof RootActions = string>(
      ...parameters: GlobalParametersWithType<T, RootActions>
    ): Promisify<ReturnType<RootActions[T]>>;

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
