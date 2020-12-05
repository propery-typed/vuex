import { AuthAccountModule } from './auth-account.module';

export const authAccountInitialState: AuthAccountModule['state'] = {
  status: null,
  user: { name: 'John Doe' },
  userProjects: [],
};
