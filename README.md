## @properly-typed/vuex

Strict types for vuex modules

> **⚠ TypeScript 4.1 needed**
>
> This package makes heavy use of TypeScript 4.1 features like [Key Remapping](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#key-remapping-mapped-types) and [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types), so you won't be able to use it with TypeScript version under 4.1

Also this package contains only type definitions, so it won't affect your javascript code in any way.

### Usage

Only type alias can be used configuring module. If you want to pass interfaces into `ModuleConfig` generic, you can pass it into `ConvertToAlias` helper.

```ts
import { ToDictionary, ModuleConfig } from '@properly-typed/vuex';

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
  // Usage of interface for State is ok
  IAuthModuleState,
  never,
  // Usage of type alias for mutations/getters/actions is ok
  AuthActions,
  // To use interface for mutations/getters/actions, you need to convert it into type alias
  ToDictionary<IAuthMutations>,
  { account: AuthAccountModuleConfig }
>;
```
