export type MappedReturnType<
  T extends { [k: string]: (...parameters: any) => any } | undefined,
> = T extends { [k: string]: (...parameters: any) => any }
  ? { [K in keyof T]: ReturnType<T[K]> }
  : { [k: string]: unknown };
