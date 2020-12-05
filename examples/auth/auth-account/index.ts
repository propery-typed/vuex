import { authAccountActions } from './auth-account.actions';
import { authAccountGetters } from './auth-account.getters';
import { authAccountMutations } from './auth-account.mutations';
import { authAccountInitialState } from './auth-account.state';
import { AuthAccountModule } from './auth-account.module';

export const account: AuthAccountModule = {
  namespaced: true,
  state: authAccountInitialState,
  getters: authAccountGetters,
  actions: authAccountActions,
  mutations: authAccountMutations,
};
