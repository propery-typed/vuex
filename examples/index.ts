import { RootModule } from './root.module';
import { auth } from './auth';

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
