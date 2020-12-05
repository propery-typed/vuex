import { AuthModule } from './auth.module';
import { account } from './auth-account';
import { authMutations } from './auth.mutations';
import { authActions } from './auth.actions';

export const auth: AuthModule = {
  namespaced: true,
  state: () => ({ isAuthed: false }),
  actions: authActions,
  mutations: authMutations,
  modules: {
    account,
  },
};
