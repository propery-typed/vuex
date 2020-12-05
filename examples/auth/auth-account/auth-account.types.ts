import { IUser, IProject } from '@examples/models';
import { ModuleConfig } from '@/module-config';

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
  resetModuleState: () => void;
};

export type AuthAccountModuleConfig = ModuleConfig<{
  namespaced: boolean;
  state: AuthAccountState;
  actions: AuthAccountActions;
  getters: AuthAccountGetters;
  mutations: AuthAccountMutations;
}>;
