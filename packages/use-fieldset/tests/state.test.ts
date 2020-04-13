import test from 'tape'
import {
  initState,
  someFieldEquals,
  everyFieldEquals,
  updateFieldValue,
  updateFieldError,
  updateFieldFlag,
  initFieldErrors,
  initFieldFlags,
  updateState,
  changeField,
  startValidatingField,
  reportValidField,
  reportInvalidField,
  resetFields,
  commitFields,
  isTouched,
  isDirty,
  isValidating,
  hasErrors,
  isSound,
  getFieldState,
} from '../src/state'

const fields = {
  a: 0,
  b: 'foo',
  c: ['bar', 'baz'],
}

test('someFieldEquals', (assert) => {
  assert.equal(
    someFieldEquals(
      {
        a: false,
        b: false,
        c: true,
      },
      true,
    ),
    true,
    'Returns true when any field equals the predicate',
  )

  assert.equal(
    someFieldEquals(
      {
        a: false,
        b: false,
        c: false,
      },
      true,
    ),
    false,
    'Returns false when no field value equals the predicate',
  )

  assert.end()
})

test('everyFieldEquals', (assert) => {
  assert.equal(
    everyFieldEquals(
      {
        a: false,
        b: false,
        c: false,
      },
      false,
    ),
    true,
    'Returns true when all fields equal the predicate',
  )

  assert.equal(
    everyFieldEquals(
      {
        a: false,
        b: false,
        c: true,
      },
      false,
    ),
    false,
    "Returns false when any field doesn't match the predicate",
  )

  assert.end()
})

test('initState', (assert) => {
  const state = initState(fields)
  assert.equal(
    state.initialValues,
    fields,
    'initialValues equal the passed fields',
  )

  assert.equal(
    state.values,
    fields,
    'values equal the passed fields',
  )

  assert.equal(
    everyFieldEquals(state.errors, false),
    true,
    'initially all errors equal false.',
  )

  assert.equal(
    everyFieldEquals(state.touched, false),
    true,
    'initially no field is marked as touched.',
  )

  assert.equal(
    everyFieldEquals(state.dirty, false),
    true,
    'initially no field is marked as dirty.',
  )

  assert.equal(
    everyFieldEquals(state.validating, false),
    true,
    'initially no field is marked as validating.',
  )

  assert.end()
})

test('updateFieldValue', (assert) => {
  const state = initState(fields)
  const nextValues = updateFieldValue(state.values, 'a', 1)

  assert.equal(nextValues.a, 1, 'updates a field value')
  assert.end()
})

test('updateFieldError', (assert) => {
  const state = initState(fields)
  const withErrorMsg = updateFieldError(
    state.errors,
    'a',
    'Foo',
  )

  assert.equal(
    withErrorMsg.a,
    'Foo',
    'updates a field error',
  )

  const withErrorList = updateFieldError(
    state.errors,
    'a',
    ['Foo', 'Bar'],
  )

  assert.deepEqual(
    withErrorList.a,
    ['Foo', 'Bar'],
    'accepts a list of errors',
  )

  assert.end()
})

test('updateFieldFlag', (assert) => {
  const state = initState(fields)
  const withUpdatedFlag = updateFieldFlag(
    state.validating,
    'a',
    true,
  )

  assert.equal(
    withUpdatedFlag.a,
    true,
    'Updates the field flag on the passed flag collection',
  )

  assert.end()
})

test('initFieldErrors', (assert) => {
  const withErrors = initFieldErrors(fields, 'Foo')

  assert.deepEqual(
    Object.keys(withErrors),
    ['a', 'b', 'c'],
    'returns a new field errors collection with a value for every key.',
  )

  assert.deepEqual(
    Object.values(withErrors),
    ['Foo', 'Foo', 'Foo'],
    'returns a new field errors collection with all values set to the passed paramter.',
  )

  assert.end()
})

test('initFieldFlags', (assert) => {
  const withFlags = initFieldFlags(fields, true)

  assert.deepEqual(
    Object.keys(withFlags),
    ['a', 'b', 'c'],
    'returns a new field flag collection with a value for every key.',
  )

  assert.deepEqual(
    Object.values(withFlags),
    [true, true, true],
    'returns a new field flag collection with all values set to the passed paramter.',
  )

  assert.end()
})

test('updateState', (assert) => {
  const state = initState(fields)

  const nextState = updateState(state, {
    errors: updateFieldError(state.errors, 'a', 'Foo'),
  })

  assert.equal(
    state.values,
    nextState.values,
    'leaves untouched substates.',
  )

  assert.equal(
    nextState.errors.a,
    'Foo',
    'updates passed substates.',
  )

  assert.end()
})

test('changeField', (assert) => {
  const state = initState(fields)
  const nextFieldC = ['hello', 'world']
  const nextState = changeField(state, 'c', nextFieldC)
  assert.equal(
    nextState.values.c,
    nextFieldC,
    'Updates the field.',
  )
  assert.equal(
    nextState.touched.c,
    true,
    'Marks the field as touched.',
  )

  assert.equal(
    nextState.dirty.c,
    true,
    'Marks the field as dirty.',
  )

  const reversedState = changeField(
    nextState,
    'c',
    state.values.c,
  )

  assert.equal(
    reversedState.touched.c,
    false,
    'Marks the field as untouched, if the value equals the initial one.',
  )

  assert.equal(
    reversedState.dirty.c,
    false,
    'Marks the field as not dirty, if the value equals the initial one.',
  )

  const cleanNextState = changeField(
    state,
    'c',
    nextFieldC,
    false,
  )

  assert.equal(
    cleanNextState.dirty.c,
    false,
    'Skips dirty report if param "markAsDirty" equals false',
  )

  assert.end()
})

test('startValidatingField', (assert) => {
  const state = initState(fields)
  const nextState = startValidatingField(state, 'b')

  assert.equal(
    nextState.validating.b,
    true,
    'Marks the field as validating.',
  )

  assert.end()
})

test('reportValidField', (assert) => {
  const state = startValidatingField(initState(fields), 'b')
  const nextState = reportValidField(state, 'b')

  assert.equal(
    nextState.validating.b,
    false,
    'Marks the field as validated.',
  )
  assert.equal(
    nextState.dirty.b,
    false,
    'Marks the field as non-dirty.',
  )

  assert.equal(
    nextState.errors.b,
    false,
    'clears any errors on the field.',
  )

  assert.end()
})

test('reportInvalidField', (assert) => {
  const state = startValidatingField(initState(fields), 'b')
  const error = 'Foobar'
  const nextState = reportInvalidField(state, 'b', error)

  assert.equal(
    nextState.validating.b,
    false,
    'Marks the field as validated.',
  )
  assert.equal(
    nextState.dirty.b,
    false,
    'Marks the field as non-dirty.',
  )

  assert.equal(
    nextState.errors.b,
    error,
    'writes the error to the given field.',
  )

  assert.end()
})

test('resetFields', (assert) => {
  const state = changeField(initState(fields), 'b', 'Bar')

  const resetState = resetFields(state)

  assert.equal(
    resetState.values,
    fields,
    'Without param: resets the state to its initial values.',
  )
  assert.equal(
    everyFieldEquals(resetState.errors, false) &&
      everyFieldEquals(resetState.touched, false) &&
      everyFieldEquals(resetState.dirty, false) &&
      everyFieldEquals(resetState.validating, false),
    true,
    'Clears any field flags.',
  )

  const fieldsToReplace = {
    a: 42,
    b: 'Baz',
    c: ['Foo', 'bar'],
  }

  const replacedState = resetFields(state, fieldsToReplace)
  assert.equal(
    replacedState.values,
    fieldsToReplace,
    'Replaces the fields with the ones passed as second param.',
  )

  assert.end()
})

test('commitFields', (assert) => {
  const state = reportValidField(
    changeField(initState(fields), 'b', 'Bar'),
    'a',
  )

  const committedState = commitFields(state)

  assert.equal(
    committedState.initialValues,
    state.values,
    'Sets the initialValues state to the current values.',
  )

  assert.equal(
    everyFieldEquals(committedState.errors, false) &&
      everyFieldEquals(committedState.touched, false) &&
      everyFieldEquals(committedState.dirty, false) &&
      everyFieldEquals(committedState.validating, false),
    true,
    'Clears any field flags.',
  )

  assert.end()
})

test('isTouched', (assert) => {
  const state = initState(fields)
  const touchedState = changeField(state, 'b', 'Bar')

  assert.equal(
    isTouched(state),
    false,
    'returns false if no field is marked as touched',
  )

  assert.equal(
    isTouched(touchedState),
    true,
    'returns true if any field is marked as touched',
  )

  assert.end()
})

test('isDirty', (assert) => {
  const state = initState(fields)
  const dirtyState = changeField(state, 'b', 'Bar')

  assert.equal(
    isDirty(state),
    false,
    'returns false if no field is marked as dirty',
  )

  assert.equal(
    isDirty(dirtyState),
    true,
    'returns true if any field is marked as dirty',
  )

  assert.end()
})

test('isValidating', (assert) => {
  const state = initState(fields)
  const validatingState = startValidatingField(
    changeField(state, 'b', 'Bar'),
    'b',
  )

  assert.equal(
    isValidating(state),
    false,
    'returns false if no field is marked as validating',
  )

  assert.equal(
    isValidating(validatingState),
    true,
    'returns true if any field is marked as validating',
  )

  assert.end()
})

test('hasErrors', (assert) => {
  const state = initState(fields)
  const invalidState = reportInvalidField(
    changeField(state, 'b', 'Bar'),
    'b',
    'Foo',
  )

  assert.equal(
    hasErrors(state),
    false,
    'returns false if no field has reported errors',
  )

  assert.equal(
    hasErrors(invalidState),
    true,
    'returns true if any field has reported errors',
  )

  assert.end()
})

test('isSound', (assert) => {
  const state = initState(fields)
  const changedState = changeField(state, 'b', 'Bar')

  assert.equal(
    isSound(changedState),
    false,
    'returns false if any field is marked as dirty',
  )

  const validatingState = startValidatingField(state, 'b')
  assert.equal(
    isSound(validatingState),
    false,
    'returns false if any field is marked as validating',
  )

  const invalidState = reportInvalidField(state, 'b', 'Foo')
  assert.equal(
    isSound(invalidState),
    false,
    'returns false if any field has reported errors',
  )

  assert.equal(
    isSound(state),
    true,
    'returns true if no field is either validating, dirty or has errors.',
  )

  assert.end()
})

test('getFieldState', (assert) => {
  const state = initState(fields)
  const changedState = reportInvalidField(
    changeField(state, 'b', 'Bar'),
    'b',
    ['Foo', 'Bar'],
  )
  const fieldB = getFieldState(changedState, 'b')

  assert.equal(
    fieldB.value,
    changedState.values.b,
    "the aggregate's value prop equals values[fieldname]",
  )
  assert.equal(
    fieldB.dirty,
    changedState.dirty.b,
    "the aggregate's dirty prop equals dirty[fieldname]",
  )
  assert.equal(
    fieldB.touched,
    changedState.touched.b,
    "the aggregate's touched prop equals touched[fieldname]",
  )
  assert.equal(
    fieldB.dirty,
    changedState.validating.b,
    "the aggregate's validating prop equals validating[fieldname]",
  )
  assert.equal(
    fieldB.errors,
    changedState.errors.b,
    "the aggregate's errors prop equals errors[fieldname]",
  )

  assert.end()
})
