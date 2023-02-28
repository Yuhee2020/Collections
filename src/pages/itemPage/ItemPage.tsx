import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { BackTo } from '../../components/backTo/BackTo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getItemTC } from '../../store/reducers/itemsReducer'

import { Comments } from './comments/Comments'
import { CommentsCreator } from './commentsCreator/CommentsCreator'
import Item from './item/Item'
import s from './ItemPage.module.scss'

export const ItemPage = () => {
  const dispatch = useAppDispatch()
  const { itemId } = useParams()
  const isLogin = useAppSelector(state => state.auth.isLogin)

  useEffect(() => {
    itemId && dispatch(getItemTC(itemId))
  }, [dispatch, itemId])

  return (
    <>
      <BackTo />
      <div className={s.pageContainer}>
        <div className={s.pageBox}>
          <Item />
          {isLogin && <CommentsCreator itemId={itemId} />}
          <Comments itemId={itemId} />
        </div>
      </div>
    </>
  )
}
