import { TypedModule } from '@/module';

import { auth } from './auth/auth.module';
import { RootConfig } from './root.config';
import { RootModuleConfig } from './root.types';

type RootModule = TypedModule<RootModuleConfig, RootConfig>;

export const rootModule: RootModule = {
  namespaced: false,
  modules: {
    auth,
  },
  actions: {
    someAction: () => 'dude',
  },
  state: {
    some: 'some',
  },
};
