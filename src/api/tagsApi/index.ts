export type TagType = {
  title: string
  _id?: string
}
export type getTagsResponseType = {
  message: string
  tags: TagType[]
}
