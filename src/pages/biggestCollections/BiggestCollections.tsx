import React, { useEffect } from 'react'

import { List } from 'antd'

import { Collection } from '../../components/collection/Collection'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getCollectionsTC } from '../../store/reducers/collectionsReducer'

import s from './BiggestCollections.module.scss'

export const BiggestCollections = () => {
  const dispatch = useAppDispatch()
  const { collections, collectionsAreLoading } = useAppSelector(
    state => state.collections,
  )

  useEffect(() => {
    dispatch(getCollectionsTC())
  }, [dispatch])

  return (
    <div className={s.listContainer}>
      <List
        loading={collectionsAreLoading}
        itemLayout="vertical"
        size="small"
        pagination={{ pageSize: 10 }}
        dataSource={collections}
        renderItem={item => (
          <div className={s.collection}>
            <Collection item={item} />
          </div>
        )}
      />
    </div>
  )
}
