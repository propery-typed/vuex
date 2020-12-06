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

type UntypedCommit = {
  // Untyped mutation
  (
    type: string,
    payload?: unknown,
    options?: CommitOptions,
  ): void;
  // Untyped mutation with type in payload
  (
    payloadWithType: {
      type: string;
      payload?: unknown;
    },
    options?: CommitOptions,
  ): void;
};

type GlobalCommit<RootMutations extends CustomMutations> = {
  // Global mutation
  <T extends keyof RootMutations>(
    type: T,
    ...parameters: GlobalParameters<RootMutations[T]>
  ): ReturnType<RootMutations[T]>;
  // Global mutation with type in payload
  <T extends keyof RootMutations>(
    ...parameters: GlobalParametersWithType<T, RootMutations>
  ): ReturnType<RootMutations[T]>;
};

type LocalCommit<Mutations extends CustomMutations> = {
  // Local mutation
  <T extends keyof Mutations>(
    type: T,
    ...parameters: LocalParameters<Mutations[T]>
  ): ReturnType<Mutations[T]>;
  // Local mutation with type in payload
  <T extends keyof Mutations>(
    ...parameters: LocalParametersWithType<T, Mutations>
  ): ReturnType<Mutations[T]>;
};

type LocalAndGlobalCommit<
  Mutations extends CustomMutations,
  RootMutations extends CustomMutations,
> = {
  // Global mutation
  <T extends keyof RootMutations>(
    type: T,
    ...parameters: GlobalParameters<RootMutations[T]>
  ): ReturnType<RootMutations[T]>;
  // Global mutation with type in payload
  <T extends keyof RootMutations>(
    ...parameters: GlobalParametersWithType<T, RootMutations>
  ): ReturnType<RootMutations[T]>;

  // Local mutation
  <T extends keyof Mutations>(
    type: T,
    ...parameters: LocalParameters<Mutations[T]>
  ): ReturnType<Mutations[T]>;
  // Local mutation with type in payload
  <T extends keyof Mutations>(
    ...parameters: LocalParametersWithType<T, Mutations>
  ): ReturnType<Mutations[T]>;
};

export type TypedCommit<
  Mutations extends CustomMutations | undefined,
  RootMutations extends CustomMutations,
> = IsAny<Mutations> extends true
  ? IsAny<RootMutations> extends true
    ? UntypedCommit
    : GlobalCommit<RootMutations>
  : Mutations extends CustomMutations
    ? IsAny<RootMutations> extends true
      ? LocalCommit<Mutations>
      : LocalAndGlobalCommit<Mutations, RootMutations>
    : UntypedCommit;
