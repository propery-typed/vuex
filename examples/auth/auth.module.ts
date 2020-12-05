import { TypedModule } from '@/module';
import { RootConfig } from '../root.config';
import { AuthModuleConfig } from './auth.types';

export type AuthModule = TypedModule<AuthModuleConfig, RootConfig>;
