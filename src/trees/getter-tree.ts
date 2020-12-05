import { DefaultModuleConfig, DefaultRootConfig } from '@/defaults';
import { CustomGetters } from '@/primitives/custom-getters';
import { Unreachable } from '@/utils/unreachable';
import { MappedReturnType } from '../utils/mapped-return-type';

export type TypedGettersTree<
  Config extends DefaultModuleConfig,
  RootConfig extends DefaultRootConfig,
> = Config['getters'] extends infer Getters
  ? Getters extends CustomGetters
    ? {
      [K in keyof Getters]: (
        state: Config['state'],
        getters: MappedReturnType<Getters>,
        rootState: RootConfig['state'],
        rootGetters: RootConfig['getters'],
      ) => ReturnType<Getters[K]>
    }
    : never
  : Unreachable;
