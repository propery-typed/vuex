import { AuthAccountModule } from './auth-account.module';

export const authAccountGetters: AuthAccountModule['getters'] = {
  isUserAdmin: (state) => Boolean(state.status),
  isUserOfficeDirector: (state, getters) => Boolean(getters.isUserAdmin),
  isUserOfficeViewer: (state, getters, rootState) => Boolean(rootState),
  isUserEmployee: (state, getters, rootState, rootGetters) => Boolean(rootGetters),
  isUserPV: (state) => Boolean(state),
};
