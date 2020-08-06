import test from 'tape'
import { Signal } from '../src'

test('Signal API constructor', (assert) => {
  const s = Signal()
  assert.isNot(s.has, undefined, 'returns method "has"')
  assert.isNot(
    s.hasAny,
    undefined,
    'returns method "hasAny"',
  )
  assert.isNot(s.add, undefined, 'returns method "add"')
  assert.isNot(
    s.remove,
    undefined,
    'returns method "remove"',
  )
  assert.isNot(
    s.removeAll,
    undefined,
    'returns method "removeAll"',
  )
  assert.isNot(
    s.broadcast,
    undefined,
    'returns method "broadcast"',
  )
  assert.isNot(
    s.live,
    undefined,
    'exposes boolean property "live"',
  )

  assert.end()
})

test('Signal.has', (assert) => {
  const s = Signal()
  const foo = () => {
    // empty
  }
  assert.false(
    s.has(foo),
    'returns false if the given handler is not registered',
  )
  s.add(foo)
  assert.true(
    s.has(foo),
    'returns true if the given handler is in fact registered',
  )

  assert.end()
})

test('Signal.add', (assert) => {
  const s = Signal()
  const foo = () => {
    // empty
  }
  assert.false(s.has(foo))
  s.add(foo)
  assert.true(
    s.has(foo),
    'imperatively adds a listener to the signal',
  )
  assert.end()
})

test('Signal.remove', (assert) => {
  const s = Signal()
  const foo = () => {
    // empty
  }
  assert.false(s.has(foo))
  s.add(foo)
  assert.true(s.has(foo))
  s.remove(foo)
  assert.false(
    s.has(foo),
    'imperatively removes a listener from the signal',
  )
  assert.end()
})

test('Signal.hasAny', (assert) => {
  const s = Signal()
  const foo1 = () => {
    // empty
  }
  const foo2 = () => {
    // empty
  }
  assert.false(s.hasAny())

  s.add(foo1)
  s.add(foo2)
  assert.true(s.hasAny())

  s.remove(foo1)
  assert.true(
    s.hasAny(),
    'returns true if any listeners are registered to this signal',
  )

  s.remove(foo2)
  assert.false(
    s.hasAny(),
    'returns false if no listeners are registered to this signal',
  )

  assert.end()
})

test('Signal.removeAll', (assert) => {
  const s = Signal()
  const foo1 = () => {
    // empty
  }
  const foo2 = () => {
    // empty
  }
  assert.false(s.hasAny())

  s.add(foo1)
  s.add(foo2)
  assert.true(s.hasAny())
  assert.true(s.has(foo1))
  assert.true(s.has(foo2))

  s.removeAll()
  assert.false(s.has(foo1))
  assert.false(s.has(foo2))
  assert.false(
    s.hasAny(),
    'resets the internal list of listeners',
  )

  assert.end()
})

test('Signal.hasAny', (assert) => {
  const s = Signal()
  const foo1 = () => {
    // empty
  }
  const foo2 = () => {
    // empty
  }
  assert.false(s.hasAny())

  s.add(foo1)
  s.add(foo2)
  assert.true(s.hasAny())

  s.remove(foo1)
  assert.true(
    s.hasAny(),
    'returns true if any listeners are registered to this signal',
  )

  s.remove(foo2)
  assert.false(
    s.hasAny(),
    'returns false if no listeners are registered to this signal',
  )

  assert.end()
})

test('Signal.broadcast', (assert) => {
  const s = Signal<number>()
  let count = 4

  const foo1 = (val: number) => {
    count += val
  }
  const foo2 = (val: number) => {
    count /= val
  }

  s.add(foo1)
  s.add(foo2)

  s.broadcast(4)

  assert.equal(
    count,
    2,
    'passes a broadcasted value to all registered listeners. Listeners processed as by «first come, first serve»',
  )

  assert.end()
})

test('Signal.live property', (assert) => {
  const s = Signal<number>(false)
  let count = 4

  const foo1 = (val: number) => {
    count += val
  }
  const foo2 = (val: number) => {
    count /= val
  }

  s.add(foo1)
  s.add(foo2)

  s.broadcast(4)

  assert.equal(
    count,
    4,
    'skips broadcasting if `live` property equals false',
  )

  s.live = true
  s.broadcast(4)

  assert.equal(
    count,
    2,
    "will broadcast according to the Signal's `live` property",
  )

  assert.end()
})
