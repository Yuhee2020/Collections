import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { BackTo } from '../../components/backTo/BackTo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setUserProfile } from '../../store/reducers/usersReducer'

import { UserCollections } from './userCollections/UserCollections'
import s from './UserPage.module.scss'
import { UserProfile } from './userProfile/UserProfile'

export const UserPage = () => {
  const dispatch = useAppDispatch()
  const { userId } = useParams()
  const user = useAppSelector(
    userId ? state => state.users.userProfile : state => state.auth.user,
  )

  useEffect(() => {
    userId && dispatch(setUserProfile(userId))
  }, [dispatch, userId])

  return (
    <>
      <BackTo />
      <div className={s.userPageContainer}>
        <UserProfile user={user} />
        <UserCollections userId={user?._id} />
      </div>
    </>
  )
}
