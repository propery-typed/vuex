import { DefaultModuleConfig } from '@/defaults';
import { CustomMutations } from '@/primitives/custom-mutations';
import { Unreachable } from '@/utils/unreachable';
import { WithContext } from '../utils/with-context';

export type TypedMutationTree<
  Config extends DefaultModuleConfig,
> = Config['mutations'] extends infer Mutations
  ? Mutations extends CustomMutations
    ? WithContext<Mutations, Config['state']>
    : never
  : Unreachable;
