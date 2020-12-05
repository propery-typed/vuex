import { ModuleConfig } from '@/module-config';
import { AuthModuleConfig } from './auth/auth.types';

type RootState = {
  some: 'some';
};

type RootActions = {
  someAction: () => 'dude';
};

export type RootModuleConfig = ModuleConfig<{
  namespaced: false;
  staet: RootState;
  actions: RootActions;
  modules: { auth: AuthModuleConfig };
}>;
