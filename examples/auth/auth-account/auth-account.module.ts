import { RootConfig } from '@examples/root.config';
import { TypedModule } from '@/module';
import { AuthAccountModuleConfig } from './auth-account.types';

export type AuthAccountModule = TypedModule<AuthAccountModuleConfig, RootConfig>;
