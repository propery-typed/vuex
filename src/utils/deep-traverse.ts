import { DefaultModuleConfig } from '@/defaults';
import {
  IsAny,
  IsNever,
  IsUndefined,
  IsUnknown,
  Or,
} from '@properly-typed/utils';
// TODO: fix this import with nex release
import { ObjectFlatten } from '@properly-typed/utils/dist/object/object-flatten';
import { StripNever } from './strip-never';
import { Unreachable } from './unreachable';

type ExtractField<
  Module extends DefaultModuleConfig,
  Field extends keyof DefaultModuleConfig,
> = Field extends keyof Module
  ? IsNever<Module[Field]> extends true
    ? unknown
    : IsAny<Module[Field]> extends true
      ? unknown
      : Module[Field] extends undefined
        ? unknown
        : Module[Field]
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

type NamespacedKeys<
  ModuleTree extends { [k: string]: any },
> = {
  [K in keyof ModuleTree as ModuleTree[K]['namespaced'] extends true
    ? K
    : never]: K
} extends infer NamespacedModules
  ? NamespacedModules[keyof NamespacedModules]
  : Unreachable;

type OnlyNamespaced<
  ModuleTree extends { [k: string]: any },
> = Pick<ModuleTree, NamespacedKeys<ModuleTree>>;

type OnlyNonNamespaced<
  ModuleTree extends { [k: string]: any },
> = Omit<ModuleTree, NamespacedKeys<ModuleTree>>;

type ParseNamespacedModules<
  ModuleTree extends { [k: string]: any },
  T extends keyof DefaultModuleConfig,
> = OnlyNamespaced<ModuleTree> extends infer NamespacedModules
  // TODO: replace with @properly-typed/utils EmptyObject matcher
  ? NamespacedModules extends { [k: string]: never }
    ? unknown
    : { [K in keyof NamespacedModules]: DeepTraverseNamespaced<NamespacedModules[K], T> }
  : Unreachable;

type ValidateField<F> = Or<[IsNever<F>, IsUndefined<F>]> extends true
  ? unknown
  : F;

type ParseNonNamespacedModules<
  ModuleTree extends { [k: string]: any },
  T extends keyof DefaultModuleConfig,
> = OnlyNonNamespaced<ModuleTree> extends infer NonNamespacedModules
  // TODO: replace with @properly-typed/utils EmptyObject matcher
  ? NonNamespacedModules extends { [k: string]: never }
    ? unknown
    : ObjectFlatten<NonNamespacedModules> extends infer FlattenedModules
      ? FlattenedModules extends DefaultModuleConfig
        ? DeepTraverseNamespaced<FlattenedModules, T>
        : unknown
      : Unreachable
  : Unreachable;

type ParseModules<
  ModuleTree extends { [k: string]: any },
  FieldType extends keyof DefaultModuleConfig,
> = ParseNamespacedModules<ModuleTree, FieldType>
& ParseNonNamespacedModules<ModuleTree, FieldType>;

export type DeepTraverseNamespaced<
  Module extends DefaultModuleConfig,
  FieldType extends keyof DefaultModuleConfig,
> = IsAny<Module> extends true
  ? any
  : IsNever<Module> extends true
    ? never
    : ValidateField<Module[FieldType]> extends infer Field
      ? Module['modules'] extends infer Modules
        ? Or<[IsUnknown<Modules>, IsNever<Modules>]> extends true
          ? Field
          : Field & ParseModules<Modules, FieldType>
        : Unreachable
      : Unreachable;
