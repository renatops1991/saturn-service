export const getFieldsWithValidValues = (fields: Object): Object => {
  return Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => !!value)
  )
}
