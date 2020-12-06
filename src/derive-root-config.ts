import {
  Leaves,
  ValueByPath,
  ObjectFlattenPreserveKeys,
} from '@properly-typed/utils';
import { DefaultModuleConfig } from './defaults';
import { DeepTraverse, DeepTraverseNamespaced } from './utils/deep-traverse';
import { Unreachable } from './utils/unreachable';

type NamespacedLeavesToReturnType<
 Getters extends { [k: string]: any },
> = {
  [K in Leaves<Getters, '/'>]: ValueByPath<
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
  getters: DeepTraverseNamespaced<M, 'getters'> extends infer Getters
    ? NamespacedLeavesToReturnType<Getters>
    : Unreachable;
  mutations: DeepTraverseNamespaced<M, 'mutations'> extends infer Mutations
    ? ObjectFlattenPreserveKeys<Mutations>
    : Unreachable;
  actions: DeepTraverseNamespaced<M, 'actions'> extends infer Actions
    ? ObjectFlattenPreserveKeys<Actions>
    : Unreachable;
};
