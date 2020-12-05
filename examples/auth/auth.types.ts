import { ToDictionary } from '@properly-typed/utils';
import { AuthAccountModuleConfig } from './auth-account/auth-account.types';

type AuthActions = {
  authorize: () => void;
};

interface IAuthMutations {
  setIsAuthed: (isAuthed: boolean) => void;
}

interface IAuthModuleState {
  isAuthed: boolean;
}

export type AuthModuleConfig = {
  namespaced: true;
  state: IAuthModuleState;
  actions: AuthActions;
  getters: undefined;
  mutations: ToDictionary<IAuthMutations>;
  modules: {
    account: AuthAccountModuleConfig;
  };
};
