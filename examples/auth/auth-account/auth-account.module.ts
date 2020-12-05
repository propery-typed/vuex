/* eslint-disable no-param-reassign */
import { IUser } from '@examples/models';
import { RootConfig } from '@examples/root.config';
import { TypedModule } from '@/module';
import { AuthAccountModuleConfig } from './auth-account.types';

type AuthAccountModule = TypedModule<AuthAccountModuleConfig, RootConfig>;

const authAccountInitialState: AuthAccountModule['state'] = {
  status: null,
  user: { name: 'John Doe' },
  userProjects: [],
};

const authAccountMutations: AuthAccountModule['mutations'] = {
  setLoadingStatus: (state, status) => {
    state.status = status;
  },
  loginSuccess: (state, userData) => {
    state.user = userData;
  },
  loginFailure: (state) => {
    state.status = 'error';
  },
  setUserProjects: (state, projects) => {
    state.userProjects = projects;
  },
};

const authAccountGetters: AuthAccountModule['getters'] = {
  isUserAdmin: (state) => Boolean(state.status),
  isUserOfficeDirector: (state, getters) => Boolean(getters.isUserAdmin),
  isUserOfficeViewer: (state, getters, rootState) => Boolean(rootState),
  isUserEmployee: (state, getters, rootState, rootGetters) => Boolean(rootGetters),
  isUserPV: (state) => Boolean(state),
};

const authAccountActions: AuthAccountModule['actions'] = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async ({ commit, dispatch, rootGetters }, { username, password }) => {
    const user: IUser = {
      name: 'Josh',
    };
    commit('auth/account/loginSuccess', user, { root: true });

    await dispatch('auth/account/updateUserData', user, { root: true });
  },

  updateUserData: ({ commit, getters }, userData) => {
    const some = getters.isUserOfficeDirector;

    commit('loginFailure', undefined, { root: false });

    commit('setLoadingStatus', some && userData ? 'loading' : 'error');
  },

  logout: async (context) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const something = context.rootGetters;

    await Promise.resolve();
  },

  getUserProjects: async () => { },
};

export const account: AuthAccountModule = {
  namespaced: true,
  state: authAccountInitialState,
  getters: authAccountGetters,
  actions: authAccountActions,
  mutations: authAccountMutations,
};
