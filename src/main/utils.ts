export const getFieldsWithValidValues = (fields: Object, removeField?: string): Object => {
  return Object.fromEntries(
    Object.entries(fields).filter(([field, value]) => !!value && field !== removeField)
  )
}
