import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { authTC } from '../../store/reducers/authReducer'
import { ROOT } from '../rotes/Rotes'

export const SocialAuth = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(state => state.auth.isLogin)

  useEffect(() => {
    dispatch(authTC())
  }, [dispatch])
  if (isLogin) {
    return <Navigate to={ROOT} />
  }

  return <div />
}
