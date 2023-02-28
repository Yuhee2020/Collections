import {instance} from "../instance";
import {AxiosResponse} from "axios";
import {FormikValuesType} from "../../utils/addItemFormValidation";
import {
    EditItemResponseType,
    GetItemResponseType,
    GetItemsResponseType,
    ItemType
} from "./index";


export const itemsApi = {
    createItem(item: FormikValuesType) {
        return instance.post<ItemType, AxiosResponse<GetItemsResponseType>>
        ('/items/createItem', item)
    },
    getCollectionItems(collectionId: string) {
        return instance.get<GetItemsResponseType>(`/items/getCollectionItems/${collectionId}`)
    },
    getItem(itemId: string) {
        return instance.get<GetItemResponseType>(`/items/getItem/${itemId}`)
    },
    getItems(text:string) {
        return instance.get<GetItemsResponseType>(`/items/getLastItems?text=${text}`)
    },
    deleteItems(itemsId: string[], collectionId: string) {
        return instance.put<{ itemsId: string[], collectionId: string },
            AxiosResponse<GetItemsResponseType>>(`/items/deleteItems`, {
            itemsId,
            collectionId
        })
    },
    editItem(item:ItemType) {
        return instance.put<ItemType,AxiosResponse<EditItemResponseType>>(`/items/editItem`, item)
    },

}


