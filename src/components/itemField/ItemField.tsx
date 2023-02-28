import React from 'react'

import s from './ItemField.module.scss'

type PropsType = {
  fieldTitle?: string | null
  children?: React.ReactNode
}

export const ItemField = ({ children, fieldTitle }: PropsType) => {
  return (
    <div className={s.fieldBox}>
      {fieldTitle && <div className={s.title}>{fieldTitle}:</div>}
      <div className={s.text}>{children}</div>
    </div>
  )
}
