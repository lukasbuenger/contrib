import {
  FieldsetActions,
  FieldsetActionTypes,
  FieldsetAction,
} from './actions'
import {
  FieldsetState,
  changeField,
  startValidatingField,
  reportInvalidField,
  reportValidField,
  resetFields,
  commitFields,
} from './state'

type Reducer<TState, TAction> = (
  state: TState,
  action: TAction,
) => TState

export type FieldsetReducer<TFields> = Reducer<
  FieldsetState<TFields>,
  FieldsetAction
>

export const fieldsetReducer = <TFields>(
  state: FieldsetState<TFields>,
  domainAction: FieldsetAction,
): FieldsetState<TFields> => {
  const action = domainAction as FieldsetActions<TFields>
  switch (action.type) {
    case FieldsetActionTypes.CHANGE_FIELD:
      return changeField(
        state,
        action.fieldName,
        action.value,
        action.markAsDirty,
      )
    case FieldsetActionTypes.START_VALIDATING_FIELD:
      return startValidatingField(state, action.fieldName)
    case FieldsetActionTypes.REPORT_INVALID_FIELD:
      return reportInvalidField(
        state,
        action.fieldName,
        action.errors,
      )
    case FieldsetActionTypes.REPORT_VALID_FIELD:
      return reportValidField(state, action.fieldName)
    case FieldsetActionTypes.RESET_FIELDS:
      return resetFields(state, action.nextValues)
    case FieldsetActionTypes.COMMIT_FIELDS:
      return commitFields(state)
    default:
      return state
  }
}
