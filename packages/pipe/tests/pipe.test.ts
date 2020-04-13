import test from 'tape'
import { pipe } from '../src'

test('Function pipe', (assert) => {
  const multiply = (a: number) => (b: number) => a * b
  const map = (mapFn: (v: any) => any) => (
    haystack: any[],
  ) => haystack.map(mapFn)

  const f = pipe(parseInt, multiply, map)

  assert.deepEqual(f('10')([1, 2, 3]), [10, 20, 30])
  assert.deepEqual(f('10', 2)([1, 2, 3]), [2, 4, 6])

  assert.end()
})
