import { ModuleConfig } from '@/module-config';
import { ToDictionary } from '@properly-typed/utils';
import { AuthAccountModuleConfig } from './auth-account/auth-account.types';

type AuthActions = {
  authorize: () => void;
};

interface IAuthMutations {
  setIsAuthed: (isAuthed: boolean) => void;
}

interface IAuthModuleState {
  isAuthed: boolean;
}

export type AuthModuleConfig = ModuleConfig<
true,
IAuthModuleState,
never,
AuthActions,
ToDictionary<IAuthMutations>,
{ account: AuthAccountModuleConfig }
>;
