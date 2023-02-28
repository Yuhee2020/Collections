import { Dayjs } from 'dayjs'

export type GetItemsResponseType = {
  message: string
  items: ItemType[]
}
export type GetItemResponseType = {
  message: string
  item: ItemType
}
export type EditItemResponseType = {
  message: string
  updatedItem: ItemType
}
export type ItemType = {
  _id?: string
  collectionName: string
  collectionId: string
  userId: string
  title?: string
  likesCount: number
  commentsCount: number
  usersIdWhoLiked: string[]
  tags?: string[]
  image?: string
  itemCreationDate?: Date
  productionDate?: Dayjs
  dateOfCreation?: Dayjs
  dateOfWriting?: Dayjs
  author?: string
  producer?: string
  countryOfOrigin?: string
  price?: number
  weight?: number
  numberOfCopies?: number
  description?: string
  historyOfCreation?: string
  uniqueCharacteristics?: string
  isUniqueItem?: boolean
  isAvailableForSale?: boolean
  isAvailableForExchange?: boolean
}
