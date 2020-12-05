import { IsAny } from '@properly-typed/utils';
import { CommitOptions } from 'vuex';
import { CustomMutation, CustomMutations } from './primitives/custom-mutations';

type OptionsWithRoot<V extends true | false> = V extends true
  ? Omit<CommitOptions, 'root'> & { root: true }
  : Omit<CommitOptions, 'root'> & { root?: false };

type LocalParameters<
  Mutation extends CustomMutation,
> = Parameters<Mutation>[0] extends infer Payload
  ? IsAny<Payload> extends true
    ? [payload: Payload, options?: OptionsWithRoot<false>]
    : Payload extends undefined
      ? [payload?: Payload, options?: OptionsWithRoot<false>]
      : [payload: Payload, options?: OptionsWithRoot<false>]
  : never;

type LocalParametersWithType<
  T extends keyof Mutations,
  Mutations extends CustomMutations,
> = Parameters<Mutations[T]>[0] extends infer Payload
  ? IsAny<Payload> extends true
    ? [payloadWithType: { type: T; payload: Payload }, options?: OptionsWithRoot<false>]
    : Payload extends undefined
      ? [payloadWithType?: { type: T; payload: Payload }, options?: OptionsWithRoot<false>]
      : [payloadWithType: { type: T; payload: Payload }, options?: OptionsWithRoot<false>]
  : never;

type GlobalParameters<
  RootMutation extends CustomMutation,
> = Parameters<RootMutation>[0] extends infer Payload
  ? [payload: Payload, options: OptionsWithRoot<true>]
  : never;

type GlobalParametersWithType<
  T extends keyof RootMutations,
  RootMutations extends CustomMutations,
> = Parameters<RootMutations[T]>[0] extends infer Payload
  ? [payload: { type: T; payload: Payload }, options: OptionsWithRoot<true>]
  : never;

export type TypedCommit<
  Mutations extends CustomMutations | undefined,
  RootMutations extends CustomMutations,
> = Mutations extends CustomMutations
  ? {
    // Global mutation
    <T extends keyof RootMutations = string>(
      type: T,
      ...parameters: GlobalParameters<RootMutations[T]>
    ): ReturnType<RootMutations[T]>;
    // Global mutation with type in payload
    <T extends keyof RootMutations = string>(
      ...parameters: GlobalParametersWithType<T, RootMutations>
    ): ReturnType<RootMutations[T]>;

    // Local mutation
    <T extends keyof Mutations = string>(
      type: T,
      ...parameters: LocalParameters<Mutations[T]>
    ): ReturnType<Mutations[T]>;
    // Local mutation with type in payload
    <T extends keyof Mutations = string>(
      ...parameters: LocalParametersWithType<T, Mutations>
    ): ReturnType<Mutations[T]>;
  } : {
    // Global mutation
    <T extends keyof RootMutations = string>(
      type: T,
      ...parameters: GlobalParameters<RootMutations[T]>
    ): ReturnType<RootMutations[T]>;
    // Global mutation with type in payload
    <T extends keyof RootMutations = string>(
      ...parameters: GlobalParametersWithType<T, RootMutations>
    ): ReturnType<RootMutations[T]>;
  };
