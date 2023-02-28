import { AxiosResponse } from 'axios'

import { instance } from '../instance'

import { CommentType, getCommentsResponseType } from './index'

export const commentsApi = {
  addComment(comment: CommentType) {
    return instance.post<CommentType, AxiosResponse<getCommentsResponseType>>(
      '/comments/createComment',
      comment,
    )
  },
  getComments(itemId: string) {
    return instance.get<getCommentsResponseType>(`/comments/getComments/${itemId}`)
  },
}
