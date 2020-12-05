import { AuthModuleConfig } from './auth/auth.types';

type RootState = {
  some: 'some';
};

type RootActions = {
  someAction: () => 'dude';
};

export type RootModuleConfig = {
  namespaced: false;
  staet: RootState;
  actions: RootActions;
  modules: { auth: AuthModuleConfig };
};
