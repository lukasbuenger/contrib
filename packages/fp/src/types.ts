export type NAry<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn

export type Unary<TArg, TReturn> = (arg: TArg) => TReturn
