import { CustomActions } from './primitives/custom-actions';
import { CustomGetters } from './primitives/custom-getters';
import { CustomMutations } from './primitives/custom-mutations';
import { CustomState } from './primitives/custom-state';

export type DefaultModuleConfig = {
  namespaced?: boolean;
  state?: CustomState;
  getters?: CustomGetters;
  actions?: CustomActions;
  mutations?: CustomMutations;
  modules?: any; // TODO: type this guy
};
export type DefaultRootConfig = {
  state: CustomState;
  getters: {
    [k: string]: any;
  };
  mutations: {
    [k: string]: (payload: any) => void;
  };
  actions: {
    [k: string]: (payload: any) => any;
  };
};
