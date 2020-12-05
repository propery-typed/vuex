import { AuthAccountModule } from './auth-account.module';

export const getAuthAccountInitialState: AuthAccountModule['state'] = () => ({
  status: null,
  user: { name: 'John Doe' },
  userProjects: [],
});
