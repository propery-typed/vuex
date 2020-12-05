import { DefaultModuleConfig } from '@/defaults';
import { IsAny, IsNever } from '@properly-typed/utils';
import { StripNever } from './strip-never';
import { Unreachable } from './unreachable';

type ExtractField<
  M extends DefaultModuleConfig,
  T extends keyof DefaultModuleConfig,
> = T extends keyof M
  ? IsNever<M[T]> extends true
    ? unknown
    : IsAny<M[T]> extends true
      ? unknown
      : M[T] extends undefined
        ? unknown
        : M[T]
  : unknown;

export type DeepTraverse<
  M extends DefaultModuleConfig,
  T extends keyof DefaultModuleConfig,
> = IsAny<M> extends true
  ? any
  : IsNever<M> extends true
    ? never
    : M['modules'] extends infer Modules
      ? IsNever<Modules> extends true
        ? IsAny<M[T]> extends true
          ? unknown
          : M[T]
        : StripNever<{
          [K in keyof Modules]: DeepTraverse<Modules[K], T>
        }> extends infer ModuleTree
          ? ExtractField<M, T> & ModuleTree
          : Unreachable
      : Unreachable;
