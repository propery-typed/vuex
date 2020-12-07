import { IUser } from '@examples/models';

type ModuleState = {
  user: IUser;
};

type ModuleMutations = {
  setUser: (user: IUser) => void;
};

export type ModuleConfig = {
  state: ModuleState;
  mutations: ModuleMutations;
};
