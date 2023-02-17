import {Dayjs} from "dayjs";

export type FormikValuesType = {
    author?: string
    collectionId?: string
    countryOfOrigin?: string
    dateOfCreation?: Dayjs
    dateOfWriting?: Dayjs
    description?: string
    historyOfCreation?: string
    image?: string
    isAvailableForExchange?: boolean
    isAvailableForSale?: boolean
    isUniqueItem?: boolean
    itemCreationDate?: Date
    numberOfCopies?: number
    price?: number
    producer?: string
    productionDate?: Dayjs
    tags?: string[]
    title?: string
    uniqueCharacteristics?: string
    userId?: string
    usersIdWhoLiked?: string[]
    weight?: number
    __v?: string
    _id?: string
}

export const validateAddItemForm = (values: FormikValuesType) => {
    const errors: FormikValuesType = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    return errors;
};