import React, { useEffect } from 'react'

import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Image, List, Popconfirm } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom'

import { CollectionModal } from '../../../components/collectionModal/CollectionModal'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { noImage } from '../../../images/noImage'
import {
  deleteCollectionTC,
  getCollectionsTC,
} from '../../../store/reducers/collectionsReducer'
import { COLLECTION } from '../../rotes/Rotes'

import s from './UserCollections.module.scss'

type PropsType = {
  userId?: string
}

export const UserCollections = ({ userId }: PropsType) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isMobileScreen = useMediaQuery({ query: '(max-width: 530px)' })
  const collections = useAppSelector(state => state.collections.collections)
  const collectionsAreLoading = useAppSelector(
    state => state.collections.collectionsAreLoading,
  )
  const deleteCollection = (collectionId: string) => {
    userId && dispatch(deleteCollectionTC({ collectionId, userId }))
  }

  useEffect(() => {
    dispatch(getCollectionsTC(userId))
  }, [userId, dispatch])

  return (
    <Card className={s.userCollectionsBox}>
      <div className={s.mainTitle}>{t('userCollections')}</div>
      <List
        loading={collectionsAreLoading}
        itemLayout="vertical"
        pagination={{
          pageSize: 10,
        }}
        dataSource={collections}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <CollectionModal key={item._id} edit userId={userId} collection={item} />,
              <Popconfirm
                key={item._id}
                placement="topLeft"
                title={t('sureDelete')}
                onConfirm={() => {
                  item._id && deleteCollection(item._id)
                }}
                okText={t('yes')}
                cancelText={t('no')}
              >
                <Button type="text" icon={<DeleteOutlined />}>
                  {t('delete')}
                </Button>
              </Popconfirm>,
            ]}
            extra={
              !isMobileScreen && (
                <Image
                  width={185}
                  src={item.image ? item.image : noImage}
                  fallback={noImage}
                />
              )
            }
          >
            <List.Item.Meta
              avatar={
                isMobileScreen && <Avatar shape="square" size={100} src={item.image} />
              }
              title={
                <NavLink className={s.title} to={`${COLLECTION}/${item._id}`}>
                  {item.title}
                </NavLink>
              }
              description={`${t('theme')}: ${item.theme}`}
            />
            <div className={s.itemsCount}>
              {t('itemsCount')}: {item.itemsCount}
            </div>
          </List.Item>
        )}
      />
    </Card>
  )
}
