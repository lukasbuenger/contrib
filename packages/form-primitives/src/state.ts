export type FieldsetError = string | string[]

export type FieldValues<TFields> = {
  [K in keyof TFields]: TFields[K]
}

export type FieldErrors<TFields> = {
  [K in keyof TFields]: FieldsetError | false
}

export type FieldFlags<TFields> = {
  [K in keyof TFields]: boolean
}

export type FieldsetState<TFields> = {
  initialValues: FieldValues<TFields>
  values: FieldValues<TFields>
  errors: FieldErrors<TFields>
  touched: FieldFlags<TFields>
  dirty: FieldFlags<TFields>
  validating: FieldFlags<TFields>
}

export type FieldState<
  TFields,
  TFieldName extends keyof TFields
> = {
  value: TFields[TFieldName]
  errors: FieldsetError | false
  dirty: boolean
  touched: boolean
  validating: boolean
}

export const updateFieldValue = <
  TFields,
  TFieldName extends keyof TFields
>(
  fieldValues: FieldValues<TFields>,
  fieldName: TFieldName,
  value: TFields[TFieldName],
): FieldValues<TFields> => {
  return {
    ...fieldValues,
    [fieldName]: value,
  }
}

export const updateFieldError = <
  TFields,
  TFieldName extends keyof TFields
>(
  fieldErrors: FieldErrors<TFields>,
  fieldName: TFieldName,
  error: FieldsetError | false,
): FieldErrors<TFields> => {
  return {
    ...fieldErrors,
    [fieldName]: error,
  }
}

export const initFieldErrors = <TFields>(
  fields: TFields,
  error: FieldsetError | false,
) => {
  return Object.keys(fields).reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: error,
    }),
    {} as FieldErrors<TFields>,
  )
}

export const updateFieldFlag = <
  TFields,
  TFieldName extends keyof TFields
>(
  fieldFlags: FieldFlags<TFields>,
  fieldName: TFieldName,
  flag: boolean,
): FieldFlags<TFields> => {
  return {
    ...fieldFlags,
    [fieldName]: flag,
  }
}

export const initFieldFlags = <TFields>(
  fields: TFields,
  flag: boolean,
) => {
  return Object.keys(fields).reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: flag,
    }),
    {} as FieldFlags<TFields>,
  )
}

export const someFieldEquals = <TFields>(
  fieldState: Record<keyof TFields, any>,
  value: any,
) => {
  return Object.values(fieldState).some((v) => v === value)
}

export const everyFieldEquals = <TFields>(
  fieldState: Record<keyof TFields, any>,
  value: any,
) => {
  return Object.values(fieldState).every((v) => v === value)
}

export const initState = <TFields>(
  fields: TFields,
): FieldsetState<TFields> => ({
  initialValues: fields,
  values: fields,
  errors: initFieldErrors(fields, false),
  dirty: initFieldFlags(fields, false),
  touched: initFieldFlags(fields, false),
  validating: initFieldFlags(fields, false),
})

export const updateState = <TFields>(
  state: FieldsetState<TFields>,
  updates: Partial<FieldsetState<TFields>>,
): FieldsetState<TFields> => ({
  ...state,
  ...updates,
})

// Public Mutations
export const changeField = <
  TFields,
  TFieldName extends keyof TFields
>(
  state: FieldsetState<TFields>,
  fieldName: TFieldName,
  value: TFields[TFieldName],
  markAsDirty = true,
): FieldsetState<TFields> => {
  const touched = state.initialValues[fieldName] !== value
  const nextState = updateState(state, {
    values: updateFieldValue(
      state.values,
      fieldName,
      value,
    ),
    touched: updateFieldFlag(
      state.touched,
      fieldName,
      touched,
    ),
  })
  if (!markAsDirty) {
    return nextState
  }
  return updateState(nextState, {
    dirty: updateFieldFlag(
      nextState.dirty,
      fieldName,
      touched,
    ),
  })
}

export const startValidatingField = <
  TFields,
  TFieldName extends keyof TFields
>(
  state: FieldsetState<TFields>,
  fieldName: TFieldName,
): FieldsetState<TFields> => {
  return updateState(state, {
    validating: updateFieldFlag(
      state.validating,
      fieldName,
      true,
    ),
  })
}

export const reportInvalidField = <
  TFields,
  TFieldName extends keyof TFields
>(
  state: FieldsetState<TFields>,
  fieldName: TFieldName,
  errors: FieldsetError,
): FieldsetState<TFields> => {
  return updateState(state, {
    validating: updateFieldFlag(
      state.validating,
      fieldName,
      false,
    ),
    dirty: updateFieldFlag(state.dirty, fieldName, false),
    errors: updateFieldError(
      state.errors,
      fieldName,
      errors,
    ),
  })
}

export const reportValidField = <
  TFields,
  TFieldName extends keyof TFields
>(
  state: FieldsetState<TFields>,
  fieldName: TFieldName,
): FieldsetState<TFields> => {
  return updateState(state, {
    validating: updateFieldFlag(
      state.validating,
      fieldName,
      false,
    ),
    dirty: updateFieldFlag(state.dirty, fieldName, false),
    errors: updateFieldError(
      state.errors,
      fieldName,
      false,
    ),
  })
}

export const resetFields = <TFields>(
  state: FieldsetState<TFields>,
  nextValues?: TFields,
) => {
  return initState(nextValues || state.initialValues)
}

export const commitFields = <TFields>(
  state: FieldsetState<TFields>,
) => {
  return initState(state.values)
}

// Public Aggregators
export const isValidating = <TFields>(
  state: FieldsetState<TFields>,
) => {
  return someFieldEquals(state.validating, true)
}

export const isTouched = <TFields>(
  state: FieldsetState<TFields>,
) => {
  return someFieldEquals(state.touched, true)
}

export const isDirty = <TFields>(
  state: FieldsetState<TFields>,
) => {
  return someFieldEquals(state.dirty, true)
}

export const hasErrors = <TFields>(
  state: FieldsetState<TFields>,
) => {
  return !everyFieldEquals(state.errors, false)
}

export const isSound = <TFields>(
  state: FieldsetState<TFields>,
) => {
  return (
    !isDirty(state) &&
    !isValidating(state) &&
    !hasErrors(state)
  )
}

export const getFieldState = <
  TFields,
  TFieldName extends keyof TFields
>(
  state: FieldsetState<TFields>,
  fieldName: TFieldName,
): FieldState<TFields, TFieldName> => {
  return {
    value: state.values[fieldName],
    dirty: state.dirty[fieldName],
    validating: state.validating[fieldName],
    touched: state.touched[fieldName],
    errors: state.errors[fieldName],
  }
}
