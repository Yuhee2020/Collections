import {instance} from "./instance";
import {AxiosResponse} from "axios";
import {Dayjs} from "dayjs";


export const itemsApi = {
    createItem(item: ItemType) {
        return instance.post<ItemType, AxiosResponse<CollectionItemsResponseType>>
        ('/items/createItem', item)
    },
    getCollectionItems(collectionId: string) {
        return instance.get<CollectionItemsResponseType>(`/items/getCollectionItems/${collectionId}`)
    },
    getItem(itemId: string) {
        return instance.get<GetItemResponseType>(`/items/getItem/${itemId}`)
    },
    deleteItems(itemsId: string[], collectionId: string) {
        return instance.put<{ itemsId: string[], collectionId: string },
            AxiosResponse<CollectionItemsResponseType>>(`/items/deleteItems`, {
            itemsId,
            collectionId
        })
    },
    editItem(item:ItemType) {
        return instance.put<ItemType,AxiosResponse<EditItemResponseType>>(`/items/editItem`, item)
    },

}


type CollectionItemsResponseType = {
    message: string
    collectionItems: ItemType[]
}

type GetItemResponseType = {
    message: string
    item: ItemType
}

type EditItemResponseType = {
    message: string
    updatedItem: ItemType
}

export type ItemType = {
    _id?: string
    collectionId: string
    userId: string
    title?: string
    likesCount?: number
    usersIdWhoLiked?: string[]
    tags?: string[]
    image?: string
    itemCreationDate?: Date
    productionDate?: Dayjs,
    dateOfCreation?: Dayjs,
    dateOfWriting?: Dayjs,
    author?: string,
    producer?: string,
    countryOfOrigin?: string,
    price?: number,
    weight?: number,
    numberOfCopies?: number,
    description?: string,
    historyOfCreation?: string,
    uniqueCharacteristics?: string
    isUniqueItem?: boolean,
    isAvailableForSale?: boolean,
    isAvailableForExchange?: boolean,
}