export const getFieldsWithValidValues = (objectFields: any, removeField?: string): any => {
  return Object.fromEntries(
    Object.entries(objectFields).filter(([field, value]) => !!value && field !== removeField)
  )
}
