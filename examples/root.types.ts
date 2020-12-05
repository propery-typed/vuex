import { ModuleConfig } from '@/module-config';
import { AuthModuleConfig } from './auth/auth.types';

export type RootState = {
  some: 'some';
};

export type RootActions = {
  someAction: () => 'dude';
};

export type RootModuleConfig = ModuleConfig<
false,
RootState,
never,
RootActions,
never,
{ auth: AuthModuleConfig }
>;
