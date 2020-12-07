import { TypedModule } from '@/module';
import { RootConfig } from '../root.config';

import { account } from './auth-account/auth-account.module';
import { AuthModuleConfig } from './auth.types';

type AuthModule = TypedModule<AuthModuleConfig, RootConfig>;

const authActions: AuthModule['actions'] = {
  authorize: (context) => {
    context.commit('setIsAuthed', true);
  },
};

const authMutations: AuthModule['mutations'] = {
  setIsAuthed: (state, isAuthed) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthed = isAuthed;
  },
};

export const auth: AuthModule = {
  namespaced: false,
  state: () => ({ isAuthed: false }),
  actions: authActions,
  mutations: authMutations,
  modules: {
    account,
  },
};
