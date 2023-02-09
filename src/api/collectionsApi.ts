import {instance} from "./instance";
import {AxiosResponse} from "axios";

export const collectionsApi = {
    createCollection(collection: CollectionType) {
        return instance.post<CollectionType, AxiosResponse<CreateCollectionResponseType>>
        ('/collections/createCollection', collection)
    },
    deleteCollection(collectionId: string) {
        return instance.delete<DeleteCollectionResponseType>(`/collections/delete/${collectionId}`)
    },
    getUserCollections(usersId: string) {
        return instance.get<GetUserCollectionsResponseType>(`/collections/getUserCollections/${usersId}`)
    },
}

export type CollectionType = {
    userId?: string
    theme?: string
    title?: string;
    description?: string;
    image?: FormData;
    itemsCount?: number
    creationDate?: Date
    itemsFields?: string[];
    _id?: string
}

export type CreateCollectionResponseType = {
    message: string
    newCollection: CollectionType
}

export type GetUserCollectionsResponseType={
    message: string
    newCollection: CollectionType[]
}

export type DeleteCollectionResponseType={
    message: string
    deletedCollection: CollectionType[]
}