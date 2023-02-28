import React, { useEffect } from 'react'

import { Card, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { AppSearch } from '../../../components/appSearch/AppSearch'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setItemsAreLoading, setSearch } from '../../../store/reducers/itemsReducer'
import { getTagsTC } from '../../../store/reducers/tagsReducer'

import s from './ItemSearch.module.scss'

export const ItemsSearch = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const tags = useAppSelector(state => state.tags.tags)

  const handleTagClick = (tag: string) => {
    dispatch(setSearch(tag))
    dispatch(setItemsAreLoading(true))
  }

  useEffect(() => {
    dispatch(getTagsTC())
  }, [dispatch])

  return (
    <Card title={t('itemsSearch')} className={s.searchContainer}>
      <AppSearch />
      <div className={s.tagsContainer}>
        {tags.map(tag => {
          return (
            <Tag
              key={tag._id}
              color="#023431"
              className={s.tag}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTagClick(tag.title)}
            >
              {tag.title}
            </Tag>
          )
        })}
      </div>
    </Card>
  )
}
