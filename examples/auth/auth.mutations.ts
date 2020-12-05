import { AuthModule } from './auth.module';

export const authMutations: AuthModule['mutations'] = {
  setIsAuthed: (state, isAuthed) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthed = isAuthed;
  },
};
