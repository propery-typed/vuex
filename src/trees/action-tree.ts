import { TypedActionContext } from '@/context';
import { DefaultModuleConfig, DefaultRootConfig } from '@/defaults';
import { CustomActions } from '@/primitives/custom-actions';
import { Unreachable } from '@/utils/unreachable';
import { WithContext } from '@/utils/with-context';

export type TypedActionTree<
  Config extends DefaultModuleConfig,
  RootConfig extends DefaultRootConfig,
> = Config['actions'] extends infer Actions
  ? Actions extends CustomActions
    ? WithContext<
    Actions,
    TypedActionContext<Config, RootConfig>
    >
    : never
  : Unreachable;
