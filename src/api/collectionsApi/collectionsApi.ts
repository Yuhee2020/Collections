import { AxiosResponse } from 'axios'

import { instance } from '../instance'

import {
  CollectionType,
  CreateCollectionResponseType,
  DeleteCollectionResponseType,
  EditCollectionResponseType,
  GetCollectionsResponseType,
} from './index'

export const collectionsApi = {
  createCollection(collection: CollectionType) {
    return instance.post<CollectionType, AxiosResponse<CreateCollectionResponseType>>(
      '/collections/createCollection',
      collection,
    )
  },
  deleteCollection(collectionId: string) {
    return instance.delete<DeleteCollectionResponseType>(
      `/collections/deleteCollection/${collectionId}`,
    )
  },
  getCollections(userId?: string) {
    return instance.get<GetCollectionsResponseType>(
      `/collections/getCollections?userId=${userId}`,
    )
  },
  getCollection(collectionId: string) {
    return instance.get<CollectionType>(`/collections/getCollection/${collectionId}`)
  },
  editUserCollections(collection: CollectionType) {
    return instance.put<CollectionType, AxiosResponse<EditCollectionResponseType>>(
      `/collections/editCollection`,
      collection,
    )
  },
}
