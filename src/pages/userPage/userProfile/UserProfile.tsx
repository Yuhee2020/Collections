import React from 'react'

import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useTranslation } from 'react-i18next'

import { UserType } from '../../../api/authApi'
import { CollectionModal } from '../../../components/collectionModal/CollectionModal'

import s from './UserProfile.module.scss'

type PropsType = {
  user: UserType | null
}

export const UserProfile = ({ user }: PropsType) => {
  const { t } = useTranslation()

  return (
    <Card
      className={s.profileBox}
      actions={[<CollectionModal key={user?._id} userId={user?._id} />]}
    >
      <Meta
        avatar={<Avatar />}
        title={user?.email}
        description={<div>{`${t('role')}: ${user?.role}`}</div>}
      />
    </Card>
  )
}
