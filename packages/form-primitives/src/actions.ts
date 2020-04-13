import { FieldsetError } from './state'

// Action types
export enum FieldsetActionTypes {
  CHANGE_FIELD = 'changeField',
  START_VALIDATING_FIELD = 'startValidatingField',
  REPORT_INVALID_FIELD = 'reportInvalidField',
  REPORT_VALID_FIELD = 'reportValidField',
  RESET_FIELDS = 'resetFields',
  COMMIT_FIELDS = 'commitFields',
}

export type FieldsetAction = {
  type: FieldsetActionTypes
}

export type FieldsetFieldAction<
  TFields,
  TFieldName extends keyof TFields
> = FieldsetAction & {
  fieldName: TFieldName
}

export type ChangeFieldAction<
  TFields,
  TFieldName extends keyof TFields
> = FieldsetFieldAction<TFields, TFieldName> & {
  type: FieldsetActionTypes.CHANGE_FIELD
  value: TFields[TFieldName]
  markAsDirty: boolean
}

export type StartValidatingFieldAction<
  TFields,
  TFieldName extends keyof TFields
> = FieldsetFieldAction<TFields, TFieldName> & {
  type: FieldsetActionTypes.START_VALIDATING_FIELD
}

export type ReportInvalidFieldAction<
  TFields,
  TFieldName extends keyof TFields
> = FieldsetFieldAction<TFields, TFieldName> & {
  type: FieldsetActionTypes.REPORT_INVALID_FIELD
  errors: FieldsetError
}

export type ReportValidFieldAction<
  TFields,
  TFieldName extends keyof TFields
> = FieldsetFieldAction<TFields, TFieldName> & {
  type: FieldsetActionTypes.REPORT_VALID_FIELD
}

export type ResetFieldsAction<TFields> = FieldsetAction & {
  type: FieldsetActionTypes.RESET_FIELDS
  nextValues?: TFields
}

export type CommitFieldsAction = FieldsetAction & {
  type: FieldsetActionTypes.COMMIT_FIELDS
}

// Union of all actions
export type FieldsetActions<
  TFields,
  TFieldName extends keyof TFields = keyof TFields
> =
  | ChangeFieldAction<TFields, TFieldName>
  | StartValidatingFieldAction<TFields, TFieldName>
  | ReportInvalidFieldAction<TFields, TFieldName>
  | ReportValidFieldAction<TFields, TFieldName>
  | ResetFieldsAction<TFields>
  | CommitFieldsAction

// Change field
export type ChangeFieldActionCreator<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
  value: TFields[TFieldName],
  markAsDirty?: boolean,
) => ChangeFieldAction<TFields, TFieldName>

export type ChangeField<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
  value: TFields[TFieldName],
  markAsDirty?: boolean,
) => void

// Start validating field types
export type StartValidatingFieldActionCreator<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
) => StartValidatingFieldAction<TFields, TFieldName>

export type StartValidatingField<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
) => void

// Report invalid field types
export type ReportInvalidFieldActionCreator<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
  errors: FieldsetError,
) => ReportInvalidFieldAction<TFields, TFieldName>

export type ReportInvalidField<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
  errors: FieldsetError,
) => void

// Report valid field types
export type ReportValidFieldActionCreator<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
) => ReportValidFieldAction<TFields, TFieldName>

export type ReportValidField<TFields> = <
  TFieldName extends keyof TFields
>(
  fieldName: TFieldName,
) => void

// Reset fields types
export type ResetFieldsActionCreator<TFields> = (
  nextValues?: TFields,
) => ResetFieldsAction<TFields>

export type ResetFields<TFields> = (
  nextValues?: TFields,
) => void

// Commit fieldset types
export type CommitFieldsActionCreator = () => CommitFieldsAction

export type CommitFields = () => void

// Set of action creators
export type FieldsetActionCreators<TFields> = {
  createChangeFieldAction: ChangeFieldActionCreator<TFields>
  createStartValidatingFieldAction: StartValidatingFieldActionCreator<
    TFields
  >
  createReportInvalidFieldAction: ReportInvalidFieldActionCreator<
    TFields
  >
  createReportValidFieldAction: ReportValidFieldActionCreator<
    TFields
  >
  createResetFieldsAction: ResetFieldsActionCreator<TFields>
  createCommitFieldsAction: CommitFieldsActionCreator
}

// Set of bound action creators
export type FieldsetMethods<TFields> = {
  changeField: ChangeField<TFields>
  startValidatingField: StartValidatingField<TFields>
  reportInvalidField: ReportInvalidField<TFields>
  reportValidField: ReportValidField<TFields>
  resetFields: ResetFields<TFields>
  commitFields: CommitFields
}

export const createActionCreators = <
  TFields
>(): FieldsetActionCreators<TFields> => ({
  createChangeFieldAction(
    fieldName,
    value,
    markAsDirty = true,
  ) {
    return {
      type: FieldsetActionTypes.CHANGE_FIELD,
      fieldName,
      value,
      markAsDirty,
    }
  },
  createStartValidatingFieldAction(fieldName) {
    return {
      type: FieldsetActionTypes.START_VALIDATING_FIELD,
      fieldName,
    }
  },
  createReportInvalidFieldAction(fieldName, errors) {
    return {
      type: FieldsetActionTypes.REPORT_INVALID_FIELD,
      fieldName,
      errors,
    }
  },
  createReportValidFieldAction(fieldName) {
    return {
      type: FieldsetActionTypes.REPORT_VALID_FIELD,
      fieldName,
    }
  },
  createResetFieldsAction(nextValues?) {
    return {
      type: FieldsetActionTypes.RESET_FIELDS,
      nextValues,
    }
  },
  createCommitFieldsAction() {
    return {
      type: FieldsetActionTypes.COMMIT_FIELDS,
    }
  },
})

export const bindActionCreators = <TFields>(
  actionCreators: FieldsetActionCreators<TFields>,
  dispatch: (action: FieldsetAction) => void,
): FieldsetMethods<TFields> => ({
  changeField(fieldName, value, markAsDirty?) {
    dispatch(
      actionCreators.createChangeFieldAction(
        fieldName,
        value,
        markAsDirty,
      ),
    )
  },
  startValidatingField(fieldName) {
    dispatch(
      actionCreators.createStartValidatingFieldAction(
        fieldName,
      ),
    )
  },
  reportInvalidField(fieldName, errors) {
    dispatch(
      actionCreators.createReportInvalidFieldAction(
        fieldName,
        errors,
      ),
    )
  },
  reportValidField(fieldName) {
    dispatch(
      actionCreators.createReportValidFieldAction(
        fieldName,
      ),
    )
  },
  resetFields(nextValues?) {
    dispatch(
      actionCreators.createResetFieldsAction(nextValues),
    )
  },
  commitFields() {
    dispatch(actionCreators.createCommitFieldsAction())
  },
})
