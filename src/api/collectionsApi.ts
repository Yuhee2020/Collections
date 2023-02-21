import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const collectionsApi = {
    createCollection(collection: CollectionType) {
        return instance.post<CollectionType, AxiosResponse<CreateCollectionResponseType>>
        ('/collections/createCollection', collection)
    },
    deleteCollection(collectionId: string) {
        return instance.delete<DeleteCollectionResponseType>(`/collections/deleteCollection/${collectionId}`)
    },
    getCollections(userId?: string) {
        return instance.get<GetCollectionsResponseType>(`/collections/getCollections?userId=${userId}`)
    },
    getCollection(collectionId: string) {
        return instance.get<CollectionType>(`/collections/getCollection/${collectionId}`)
    },
    editUserCollections(collection: CollectionType) {
        return instance.put<CollectionType, AxiosResponse<EditCollectionResponseType>>(`/collections/editCollection`,collection)
    },
}

export type CollectionType = {
    userId?: string
    theme?: string
    title?: string;
    description?: string;
    image?: string;
    itemsCount?: number
    creationDate?: Date
    itemsFields?: string[];
    _id?: string
}

export type CreateCollectionResponseType = {
    message: string
    collections: CollectionType[]
}

export type GetCollectionsResponseType={
    message: string
    collections: CollectionType[]
}

export type DeleteCollectionResponseType={
    message: string
    deletedCollection: CollectionType
}

export type EditCollectionResponseType={
    message: string
    updatedCollection: CollectionType
}