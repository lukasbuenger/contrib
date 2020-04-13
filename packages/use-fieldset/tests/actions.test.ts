import test from 'tape'
import {
  createActionCreators,
  bindActionCreators,
} from '../src/actions'

const fields = {
  a: 0,
  b: 'foo',
  c: ['bar', 'baz'],
}

const actionCreators = createActionCreators<typeof fields>()

test('changeField action', (assert) => {
  const defaultAction = {
    type: 'changeField',
    fieldName: 'a',
    value: 42,
    markAsDirty: true,
  }

  assert.deepEqual(
    actionCreators.createChangeFieldAction('a', 42),
    defaultAction,
    'creates a valid ChangeFieldAction',
  )

  const dispatchWithDirty = (a: any) => {
    assert.deepEqual(
      a,
      defaultAction,
      'bound method changeField action dispatches a valid action',
    )
  }
  bindActionCreators(
    actionCreators,
    dispatchWithDirty,
  ).changeField('a', 42)

  const withSkipDirtyAction = {
    type: 'changeField',
    fieldName: 'a',
    value: 42,
    markAsDirty: false,
  }

  assert.deepEqual(
    actionCreators.createChangeFieldAction('a', 42, false),
    withSkipDirtyAction,
    'creates a valid ChangeFieldAction when passing a markAsDirty argument',
  )

  const dispatchWithSkipDirty = (a: any) => {
    assert.deepEqual(
      a,
      withSkipDirtyAction,
      'bound method changeField method dispatches a valid action when called with markAsDirty=false',
    )
  }
  bindActionCreators(
    actionCreators,
    dispatchWithSkipDirty,
  ).changeField('a', 42, false)

  assert.end()
})

test('startValidatingField action', (assert) => {
  const defaultAction = {
    type: 'startValidatingField',
    fieldName: 'a',
  }

  assert.deepEqual(
    actionCreators.createStartValidatingFieldAction('a'),
    defaultAction,
    'creates a valid StartValidatingField action',
  )

  const dispatch = (a: any) => {
    assert.deepEqual(
      a,
      defaultAction,
      'bound method startValidatingField dispatches a valid action',
    )
  }
  bindActionCreators(
    actionCreators,
    dispatch,
  ).startValidatingField('a')

  assert.end()
})

test('reportInvalidField action', (assert) => {
  const defaultAction = {
    type: 'reportInvalidField',
    fieldName: 'a',
    errors: ['foo'],
  }

  assert.deepEqual(
    actionCreators.createReportInvalidFieldAction('a', [
      'foo',
    ]),
    defaultAction,
    'creates a valid ReportInvalidField action',
  )

  const dispatch = (a: any) => {
    assert.deepEqual(
      a,
      defaultAction,
      'bound method reportInvalidField dispatches a valid action',
    )
  }
  bindActionCreators(
    actionCreators,
    dispatch,
  ).reportInvalidField('a', ['foo'])

  assert.end()
})

test('reportValidField action', (assert) => {
  const defaultAction = {
    type: 'reportValidField',
    fieldName: 'a',
  }

  assert.deepEqual(
    actionCreators.createReportValidFieldAction('a'),
    defaultAction,
    'creates a valid ReportValidField action',
  )

  const dispatch = (a: any) => {
    assert.deepEqual(
      a,
      defaultAction,
      'bound method reportInvalidField dispatches a valid action',
    )
  }
  bindActionCreators(
    actionCreators,
    dispatch,
  ).reportValidField('a')

  assert.end()
})

test('resetFields action', (assert) => {
  const defaultAction = {
    type: 'resetFields',
    nextValues: undefined,
  }

  assert.deepEqual(
    actionCreators.createResetFieldsAction(),
    defaultAction,
    'creates a valid ResetField action',
  )

  const dispatch = (a: any) => {
    assert.deepEqual(
      a,
      defaultAction,
      'bound method resetFields dispatches a valid action',
    )
  }
  bindActionCreators(actionCreators, dispatch).resetFields()

  const nextFields = { a: 42, b: 'bar', c: ['Foo', 'Bar'] }
  const withNextFieldsAction = {
    type: 'resetFields',
    nextValues: nextFields,
  }

  assert.deepEqual(
    actionCreators.createResetFieldsAction(nextFields),
    withNextFieldsAction,
    'creates a valid ResetField action when called with a nextValues argument',
  )

  const dispatchWithNextValues = (a: any) => {
    assert.deepEqual(
      a,
      withNextFieldsAction,
      'bound method resetFields dispatches a valid action when called with a nextValues argument',
    )
  }

  bindActionCreators(
    actionCreators,
    dispatchWithNextValues,
  ).resetFields(nextFields)

  assert.end()
})

test('commitFields action', (assert) => {
  const defaultAction = {
    type: 'commitFields',
  }

  assert.deepEqual(
    actionCreators.createCommitFieldsAction(),
    defaultAction,
    'creates a valid CommitFields action',
  )

  const dispatch = (a: any) => {
    assert.deepEqual(
      a,
      defaultAction,
      'bound method commitFields dispatches a valid action',
    )
  }
  bindActionCreators(
    actionCreators,
    dispatch,
  ).commitFields()

  assert.end()
})
