import { ObjectLeaves, ObjectValueByPath } from '@properly-typed/utils';
import { DefaultModuleConfig } from './defaults';
import { DeepTraverse } from './utils/deep-traverse';
import { Unreachable } from './utils/unreachable';

type LeavesToOutput<O extends { [k: string]: any }> = {
  [K in ObjectLeaves<O, '/'>]: ObjectValueByPath<O, K>;
};

type LeavesToReturnType<
 Getters extends { [k: string]: any },
> = {
  [K in ObjectLeaves<Getters, '/'>]: ObjectValueByPath<
  Getters, K
  > extends infer G
    ? G extends (...parameters: any) => any
      ? ReturnType<G>
      : never
    : Unreachable;
};

export type DeriveRootConfig<
  M extends DefaultModuleConfig,
> = {
  state: DeepTraverse<M, 'state'>;
  getters: DeepTraverse<M, 'getters'> extends infer Getters
    ? LeavesToReturnType<Getters>
    : Unreachable;
  mutations: DeepTraverse<M, 'mutations'> extends infer Mutations
    ? LeavesToOutput<Mutations>
    : Unreachable;
  actions: DeepTraverse<M, 'actions'> extends infer Actions
    ? LeavesToOutput<Actions>
    : Unreachable;
};
