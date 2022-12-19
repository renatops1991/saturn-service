export const getFieldsWithValidValues = (objectFields: Object, removeField?: string): Object => {
  return Object.fromEntries(
    Object.entries(objectFields).filter(([field, value]) => !!value && field !== removeField)
  )
}
