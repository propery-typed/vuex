/* eslint-disable no-param-reassign */
import { AuthAccountModule } from './auth-account.module';

export const authAccountMutations: AuthAccountModule['mutations'] = {
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
