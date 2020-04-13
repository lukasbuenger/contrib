import { useReducer, useMemo } from 'react'
import { FieldsetReducer, fieldsetReducer } from './reducer'
import { initState, FieldsetState } from './state'
import {
  createActionCreators,
  bindActionCreators,
  FieldsetMethods,
} from './actions'

export type FieldsetHookResult<TFields> = [
  FieldsetState<TFields>,
  FieldsetMethods<TFields>,
]

export const useFieldset = <TFields>(
  fields: TFields,
): FieldsetHookResult<TFields> => {
  const [fieldsetState, dispatch] = useReducer<
    FieldsetReducer<TFields>
  >(fieldsetReducer, initState(fields))

  const actionCreators = useMemo(
    () => createActionCreators<TFields>(),
    [],
  )
  const fieldsetMethods = useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [actionCreators],
  )
  return [fieldsetState, fieldsetMethods]
}
