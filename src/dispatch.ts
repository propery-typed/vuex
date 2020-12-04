import { Promisify } from '@properly-typed/utils';
import { DispatchOptions } from 'vuex';
import { CustomActions } from './primitives/custom-actions';

type OptionsWithRoot<V extends true | false> = V extends true
  ? Omit<DispatchOptions, 'root'> & { root: true }
  : Omit<DispatchOptions, 'root'> & { root?: false };

type DeriveActionType<
  T extends keyof Actions | keyof RootActions,
  Actions extends CustomActions,
  RootActions extends CustomActions,
> = T extends keyof Actions
  ? Actions[T]
  : T extends keyof RootActions
    ? RootActions[T]
    : never;

export type TypedDispatch<
  Actions extends CustomActions,
  RootActions extends CustomActions,
> = {
  // Action
  <T extends keyof Actions | keyof RootActions = string>(
    type: T,
    payload?: Parameters<
    DeriveActionType<T, Actions, RootActions>
    >[0],
    options?: T extends keyof Actions ? OptionsWithRoot<false> : OptionsWithRoot<true>
  ): Promisify<ReturnType<
  DeriveActionType<T, Actions, RootActions>
  >>;

  // Action with `type` in the payload
  <T extends keyof Actions = string>(
    payloadWithType: {
      type: T;
      payload: Parameters<
      DeriveActionType<T, Actions, RootActions>
      >[0];
    },
    options?: T extends keyof Actions ? OptionsWithRoot<false> : OptionsWithRoot<true>
  ): Promisify<ReturnType<
  DeriveActionType<T, Actions, RootActions>
  >>;
};
