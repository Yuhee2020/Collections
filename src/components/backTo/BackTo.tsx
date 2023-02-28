import React from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import s from './BackTo.module.scss'

export const BackTo = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Button
      className={s.backTo}
      onClick={() => navigate(-1)}
      icon={<ArrowLeftOutlined />}
      type="text"
    >
      {t('back')}
    </Button>
  )
}
