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
export type GetCollectionsResponseType = {
    message: string
    collections: CollectionType[]
}
export type DeleteCollectionResponseType = {
    message: string
    deletedCollection: CollectionType
}
export type EditCollectionResponseType = {
    message: string
    updatedCollection: CollectionType
}