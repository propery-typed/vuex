import { IsAny, IsNever, IsUnknown } from '@properly-typed/utils';
import { TypedMutationTree } from './trees/mutation-tree';
import { TypedGettersTree } from './trees/getter-tree';
import { TypedActionTree } from './trees/action-tree';
import { DefaultModuleConfig, DefaultRootConfig } from './defaults';

type TypedModuleField<
  Config extends DefaultModuleConfig,
  K extends keyof Config,
  R, // Value to return if config is valid
> = IsUnknown<Config[K]> extends true
  ? never // Remove if unknown
  : IsNever<Config[K]> extends true
    ? never // Remove if never
    : R;

type AssignDefaults<T> = {
  [K in keyof T as IsNever<T[K]> extends true
    ? never // Remove `never` values
    : IsAny<T[K]> extends true
      ? K // Keep `any` values
      : T[K] extends undefined
        ? never // Remove `undefined` values
        : K // Keep the rest of the keys
  ]: IsAny<T[K]> extends true
    ? K extends keyof DefaultModuleConfig
      ? DefaultModuleConfig[K] // Assign default value if `any`
      : never // Remove if key is invalid
    : T[K]; // Keep the rest
};

export type TypedModule<
  Config extends DefaultModuleConfig = DefaultModuleConfig,
  RootConfig extends DefaultRootConfig = DefaultRootConfig,
> = AssignDefaults<{
  namespaced: TypedModuleField<Config, 'namespaced', Config['namespaced']>;
  state: TypedModuleField<
  Config,
  'state',
  Config['state'] | (() => Config['state'])
  >;
  getters: TypedModuleField<
  Config,
  'getters',
  TypedGettersTree<Config, RootConfig>
  >;
  actions: TypedModuleField<
  Config,
  'actions',
  TypedActionTree<Config, RootConfig>
  >;
  mutations: TypedModuleField<
  Config,
  'mutations',
  TypedMutationTree<Config>
  >;
  modules: TypedModuleField<
  Config,
  'modules',
  { [K in keyof Config['modules']]: TypedModule<Config['modules'][K], RootConfig> }
  >;
}>;
