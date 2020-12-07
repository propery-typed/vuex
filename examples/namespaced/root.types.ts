import { AuthModuleConfig } from './auth/auth.types';

type RootState = {
  some: 'some';
};

type RootActions = {
  someAction: () => 'dude';
};

export type RootModuleConfig = {
  namespaced: false;
  state: RootState;
  actions: RootActions;
  modules: { auth: AuthModuleConfig };
};
