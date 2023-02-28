import React from 'react'

import { Alert } from 'antd'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAppError } from '../../store/reducers/appReducer'

import s from './AppMessagesBar.module.scss'

export const AppMessagesBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)
  const successMessage = useAppSelector(state => state.app.successMessage)

  const onClose = () => {
    dispatch(setAppError(null))
  }

  return (
    <div>
      {error && (
        <Alert
          className={s.alert}
          message={error}
          type="error"
          closable
          onClose={onClose}
          showIcon
        />
      )}
      {successMessage && (
        <Alert
          className={s.alert}
          message={successMessage}
          type="success"
          closable
          onClose={onClose}
          showIcon
        />
      )}
    </div>
  )
}
