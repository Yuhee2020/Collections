type FormikValuesType = {
    title?: string
    tags?: string[]
    image?: string
    author?: string
    producer?: string
    countryOfOrigin?: string
    historyOfCreation?: string
    description?: string
    uniqueCharacteristics?: string
    price?: number
    weight?: number
    numberOfCopies?: number
    isUniqueItem?: boolean
    isAvailableForSale?: boolean
    isAvailableForExchange?: boolean
    productionDate?: string

}

export const validateAddItemForm = (values: FormikValuesType) => {
    const errors: FormikValuesType = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    return errors;
};