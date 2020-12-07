import { IUser, IProject } from '@examples/models';

type AuthAccountState = {
  status: 'success' | 'error' | 'loading' | null;
  user: IUser | null;
  userProjects: IProject[];
};

type AuthAccountActions = {
  login: (payload: { username: string; password: string }) => Promise<void>;
  updateUserData: (userData: IUser) => void;
  logout: () => Promise<void>;
  getUserProjects: () => Promise<void>;
};

type AuthAccountGetters = {
  isUserAdmin: () => boolean;
  isUserOfficeDirector: () => boolean;
  isUserOfficeViewer: () => boolean;
  isUserEmployee: () => boolean;
  isUserPV: () => boolean;
};

type AuthAccountMutations = {
  setLoadingStatus: (status: 'success' | 'error' | 'loading' | null) => void;
  loginSuccess: (userData: IUser) => void;
  loginFailure: () => void;
  setUserProjects: (projects: IProject[]) => void;
};

export type AuthAccountModuleConfig = {
  namespaced: true;
  state: AuthAccountState;
  actions: AuthAccountActions;
  getters: AuthAccountGetters;
  mutations: AuthAccountMutations;
  modules: never;
};
