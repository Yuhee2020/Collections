import React, { useEffect } from 'react'

import { Comment } from '../../../components/comment/Comment'
import { commentsDownloadTime } from '../../../constants'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getCommentsTC } from '../../../store/reducers/commentsReducer'

import s from './Comments.module.scss'

type PropsType = {
  itemId?: string
}

export const Comments = ({ itemId }: PropsType) => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments.comments)

  useEffect(() => {
    itemId && dispatch(getCommentsTC(itemId))
    const intervalId = setInterval(() => {
      itemId && dispatch(getCommentsTC(itemId))
    }, commentsDownloadTime)

    return () => clearInterval(intervalId)
  }, [dispatch, itemId])

  return (
    <div className={s.comments}>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  )
}
