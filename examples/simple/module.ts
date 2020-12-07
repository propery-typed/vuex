/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedModule } from '@/module';
import { IUser } from '@examples/models';

interface IApiService {
  getUser: (userId: string) => Promise<IUser>;
}

const apiService: IApiService = {
  getUser: async () => Promise.resolve({ name: 'Baby John' }),
};

type ModuleState = {
  user: IUser | undefined;
};

type ModuleMutations = {
  setUser: (user: IUser) => void;
};

type ModuleActions = {
  setDefaultUser: () => IUser;
  getUser: (userId?: string) => Promise<void>;
};

type ModuleConfig = {
  state: ModuleState;
  mutations: ModuleMutations;
  actions: ModuleActions;
};

export const module: TypedModule<ModuleConfig> = {
  state: () => ({
    user: undefined,
  }),
  mutations: {
    /* eslint-disable no-param-reassign */
    setUser: (state, payload): void => {
      state.user = payload;
    },
    /* eslint-enable */
  },
  actions: {
    setDefaultUser: (context): IUser => {
      const defaultUser: IUser = {
        name: 'John Doe',
      };

      context.commit('setUser', defaultUser);

      return defaultUser;
    },
    getUser: async (context, userId): Promise<void> => {
      if (!userId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const defaultUser = await context.dispatch('setDefaultUser');

        return;
      }

      const user: IUser = await apiService.getUser(userId);

      context.commit('setUser', user);
    },
  },
};
