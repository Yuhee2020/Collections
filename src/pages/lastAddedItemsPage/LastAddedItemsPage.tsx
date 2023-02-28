import React, { useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'

import { debounceDelay } from '../../constants'
import { useAppDebounce, useAppDispatch, useAppSelector } from '../../hooks'
import { getItemsTC } from '../../store/reducers/itemsReducer'

import { ItemsList } from './ItemsList/ItemsList'
import { ItemsSearch } from './itemsSearch/ItemsSearch'
import s from './LastAddedItemsPage.module.scss'

export const LastAddedItemsPage = () => {
  const { lastItems, searchText, itemsIsLoading } = useAppSelector(state => state.items)
  const dispatch = useAppDispatch()
  const isSmallScreen = useMediaQuery({ query: '(min-width: 800px)' })
  const debouncedText = useAppDebounce(searchText, debounceDelay)

  useEffect(() => {
    dispatch(getItemsTC())
  }, [debouncedText, dispatch])

  return (
    <div className={s.pageContainer}>
      <ItemsList items={lastItems} searchText={searchText} isLoading={itemsIsLoading} />
      {isSmallScreen && <ItemsSearch />}
    </div>
  )
}
