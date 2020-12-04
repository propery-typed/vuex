import { IsNever } from '@properly-typed/utils';

export type StripNever<O> = {
  [K in keyof O as IsNever<O[K]> extends true
    ? never
    : K
  ]: O[K]
};
