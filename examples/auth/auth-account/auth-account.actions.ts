import { IUser } from '@examples/models';
import { AuthAccountModule } from './auth-account.module';

export const authAccountActions: AuthAccountModule['actions'] = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async ({ commit, dispatch, rootGetters }, { username, password }) => {
    commit('auth/account/setUserProjects');

    const user: IUser = {
      name: 'Josh',
    };
    await dispatch('auth/account/updateUserData', user, { root: true });
  },

  updateUserData: ({ commit, getters }, userData) => {
    const some = getters.isUserOfficeDirector;
    commit('loginFailure', undefined, { root: false });

    commit('setLoadingStatus', some && userData ? 'loading' : 'error');
  },

  logout: async (context) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const something = context.rootGetters['auth/account/isUserOfficeViewer'];
    await Promise.resolve();
  },

  getUserProjects: async () => { },
};
