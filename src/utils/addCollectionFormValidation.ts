export type FormikValuesType = {
  theme?: string
  title?: string
  description?: string
  image?: string
  itemsFields?: string[]
}

export const validateAddCollectionForm = (values: FormikValuesType) => {
  const errors: FormikValuesType = {}

  if (!values.theme) {
    errors.theme = 'Required'
  }
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }

  return errors
}
