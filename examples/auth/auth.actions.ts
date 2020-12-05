import { AuthModule } from './auth.module';

export const authActions: AuthModule['actions'] = {
  authorize: (context) => {
    context.commit('setIsAuthed', true);
  },
};
