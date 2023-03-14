import React, { ChangeEvent, useEffect } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { ROOT } from '../../pages/rotes/Rotes'
import { setItemsAreLoading, setSearch } from '../../store/reducers/itemsReducer'

export const AppSearch = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { searchText } = useAppSelector(state => state.items)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.currentTarget.value))
    dispatch(setItemsAreLoading(true))
  }

  useEffect(() => {
    searchText && pathname !== ROOT && navigate(ROOT)
  }, [searchText, pathname, navigate])

  return (
    <Input
      size="large"
      prefix={<SearchOutlined />}
      // @ts-ignore
      placeholder={t('itemsSearch')}
      value={searchText}
      onChange={handleSearchChange}
    />
  )
}
