import { TypedDispatch } from './dispatch';
import { MappedReturnType } from './utils/mapped-return-type';
import { TypedCommit } from './commit';
import { DefaultModuleConfig, DefaultRootConfig } from './defaults';
import { CustomGetters } from './primitives/custom-getters';
import { CustomMutations } from './primitives/custom-mutations';
import { CustomActions } from './primitives/custom-actions';

export type TypedActionContext<
Config extends DefaultModuleConfig,
RootConfig extends DefaultRootConfig,
> = Config['getters'] extends CustomGetters
  ? Config['mutations'] extends CustomMutations
    ? Config['actions'] extends CustomActions
      ? {
        commit: TypedCommit<Config['mutations'], RootConfig['mutations']>;
        dispatch: TypedDispatch<Config['actions'], RootConfig['actions']>;
        state: Config['state'];
        getters: MappedReturnType<Config['getters']>;
        rootState: RootConfig['state'];
        rootGetters: RootConfig['getters'];
      }
      : never
    : never
  : never;
