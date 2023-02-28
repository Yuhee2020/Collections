export type CommentType = {
  _id?: string
  itemId: string
  text: string
  userId: string
  userName: string
  creationDate?: Date
}
export type getCommentsResponseType = {
  message: string
  comments: CommentType[]
}
