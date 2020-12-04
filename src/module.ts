import { IsAny } from '@properly-typed/utils';
import { TypedMutationTree } from './trees/mutation-tree';
import { TypedGettersTree } from './trees/getter-tree';
import { TypedActionTree } from './trees/action-tree';
import { StripNever } from './utils/strip-never';
import { DefaultModuleConfig, DefaultRootConfig } from './defaults';

type TypedModuleField<T, R> = IsAny<T> extends true
  ? any
  : T extends never
    ? never
    : R;

export type TypedModule<
  Config extends DefaultModuleConfig = DefaultModuleConfig,
  RootConfig extends DefaultRootConfig = DefaultRootConfig,
> = StripNever<{
  namespaced: TypedModuleField<Config['namespaced'], Config['namespaced']>;
  state: TypedModuleField<
  Config['state'],
  Config['state'] | (() => Config['state'])
  >;
  getters: TypedModuleField<
  Config['getters'],
  TypedGettersTree<Config, RootConfig>
  >;
  actions: TypedModuleField<
  Config['actions'],
  TypedActionTree<Config, RootConfig>
  >;
  mutations: TypedModuleField<
  Config['mutations'],
  TypedMutationTree<Config>
  >;
  modules: TypedModuleField<
  Config['modules'],
  { [K in keyof Config['modules']]: TypedModule<Config['modules'][K], RootConfig> }
  >;
}>;
