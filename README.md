## @properly-typed/vuex

Strict types for vuex modules

> **⚠ TypeScript 4.1 needed**
>
> This package makes heavy use of TypeScript 4.1 features like [Key Remapping](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#key-remapping-mapped-types) and [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types), so you won't be able to use it with TypeScript version under 4.1

Using npm:
```bash
npm i @properly-typed/vuex
```
Using yarn:
```bash
yarn add @properly-typed/vuex
```

## Introduction

> [vuex] unknown local action type: some/deeply/nested/action, global type: ...

Looks familliar?

If so, did you try to rename an action like this one?

Only imagine how many cool things you could do, if you only had no such errors. And what could it be if you had autocompletion for every action and mutation name in your vuex store?

@properly-typed/vuex are here to help you out on this one

## Simple setup

We will start with typing single module and move on to nested namespaced and non-namespaced modules

### State and mutations
```ts
import { TypedModule } from '@properly-typed/vuex';
import { IUser } from '@/models';

/** 1. Set up module state type */
type ModuleState = {
  user: IUser | undefined;
};

/**
 * 2. Set up module mutations type
 *
 * According to [Vuex docs](https://vuex.vuejs.org/guide/mutations.html),
 * mutations should have ONLY ONE ARGUMENT as payload,
 * otherwise all type system can malfunction
 */
type ModuleMutations = {
  setUser: (user: IUser) => void;
};

/** 3. Combine state and mutations type into module configuration type */
type ModuleConfig = {
  state: ModuleState;
  mutations: ModuleMutations;
};

/** 4. Use module configuration type with `TypedModule` from @properly-typed/vuex */
export const module: TypedModule<ModuleConfig> = {
  /** `state` can be of type ModuleState or () => ModuleState */
  state: () => ({
    user: undefined,
  }),
  /**
   * `mutations` will derive types from ModuleMutations,
   * but also will add state context as first parameter
   */
  mutations: {
    /**
     * `state` is of type ModuleState
     * `user` is of type IUser
     */
    setUser: (state, payload) => {
      state.user = payload;
    },
  },
};
 ```
### Actions
```ts
type ModuleState = {
  user: IUser | undefined;
};

type ModuleMutations = {
  setUser: (user: IUser) => void;
};

/**
 * 1. Set up module actions type
 *
 * Actions should have ONLY ONE ARGUMENT as payload as well
 */
type ModuleActions = {
  getUser: (userId: string) => Promise<IUser>;
};

type ModuleConfig = {
  state: ModuleState;
  mutations: ModuleMutations;
  /** 2. Add actions to module configuration type */
  actions: ModuleActions;
};

export const module: TypedModule<ModuleConfig> = {
  state: () => ({
    user: undefined,
  }),
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
  },
  /** 3. Enjoy pure magic */
  actions: {
    setDefaultUser: (context) => {
      const defaultUser: IUser = {
        name: 'John Doe',
      };

      // Errors, only 'setUser' is allowed as first argument
      context.commit('non-existing mutation');

      // Errors, `setUser` mutation should have payload
      context.commit('setUser');

      // Errors, `setUser` mutation payload should be of type IUser
      context.commit('setUser', 'new-user');

      // Passes with no errors
      context.commit('setUser', defaultUser);

     // Will be useful if you want to return some data from your dispatches
      return defaultUser;
    },
    getUser: async (context, userId) => {
      if (!userId) {
        /**
         * Vuex dispatch always returns Promise,
         * so we can await defaultUser here if we need to
         *
         * It will be of type that `setDefaultUser` action returns,
         * in this case - IUser
         */
        const defaultUser = await context.dispatch('setDefaultUser');

        return;
      }

      const user: IUser = await apiService.getUser(userId);

      context.commit('setUser', user);

      // Will be useful if you want to return some data from your dispatches
      return user;
    },
  },
};
```
  
