type NAry<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn

type Unary<TArg, TReturn> = (arg: TArg) => TReturn

/**
 * Left-to-right function composition. Requires at least two arguments. Max. number of typed arguments: 9
 */
export function pipe<TArgs extends any[], TReturn, TResult>(
  input: NAry<TArgs, TReturn>,
  output: Unary<TReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  output: Unary<AReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  output: Unary<BReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  output: Unary<CReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  output: Unary<DReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  EReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  e: Unary<DReturn, EReturn>,
  output: Unary<EReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  EReturn,
  FReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  e: Unary<DReturn, EReturn>,
  f: Unary<EReturn, FReturn>,
  output: Unary<FReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  EReturn,
  FReturn,
  GReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  e: Unary<DReturn, EReturn>,
  f: Unary<EReturn, FReturn>,
  g: Unary<FReturn, GReturn>,
  output: Unary<GReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  EReturn,
  FReturn,
  GReturn,
  HReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  e: Unary<DReturn, EReturn>,
  f: Unary<EReturn, FReturn>,
  g: Unary<FReturn, GReturn>,
  h: Unary<GReturn, HReturn>,
  output: Unary<HReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  EReturn,
  FReturn,
  GReturn,
  HReturn,
  IReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  e: Unary<DReturn, EReturn>,
  f: Unary<EReturn, FReturn>,
  g: Unary<FReturn, GReturn>,
  h: Unary<GReturn, HReturn>,
  i: Unary<HReturn, IReturn>,
  output: Unary<IReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe<
  TArgs extends any[],
  TReturn,
  AReturn,
  BReturn,
  CReturn,
  DReturn,
  EReturn,
  FReturn,
  GReturn,
  HReturn,
  IReturn,
  JReturn,
  TResult
>(
  input: NAry<TArgs, TReturn>,
  a: Unary<TReturn, AReturn>,
  b: Unary<AReturn, BReturn>,
  c: Unary<BReturn, CReturn>,
  d: Unary<CReturn, DReturn>,
  e: Unary<DReturn, EReturn>,
  f: Unary<EReturn, FReturn>,
  g: Unary<FReturn, GReturn>,
  h: Unary<GReturn, HReturn>,
  i: Unary<HReturn, IReturn>,
  j: Unary<IReturn, JReturn>,
  output: Unary<JReturn, TResult>,
): NAry<TArgs, TResult>

export function pipe(first: Function, ...fns: Function[]) {
  return (...args: any[]) => {
    return fns.reduce(
      (acc: any, fn) => fn(acc),
      first(...args),
    )
  }
}
