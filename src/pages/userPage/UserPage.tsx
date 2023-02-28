import React, { useEffect } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { BackTo } from '../../components/backTo/BackTo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setUserProfile } from '../../store/reducers/usersReducer'
import { ROOT } from '../rotes/Rotes'

import { UserCollections } from './userCollections/UserCollections'
import s from './UserPage.module.scss'
import { UserProfile } from './userProfile/UserProfile'

export const UserPage = () => {
  const dispatch = useAppDispatch()
  const { userId } = useParams()
  const isLoggedIn = useAppSelector(state => state.auth.isLogin)
  const user = useAppSelector(
    userId ? state => state.users.userProfile : state => state.auth.user,
  )

  useEffect(() => {
    userId && dispatch(setUserProfile(userId))
  }, [userId])

  if (!isLoggedIn) {
    return <Navigate to={ROOT} />
  }

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
