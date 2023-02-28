import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { BackTo } from '../../components/backTo/BackTo'
import { Collection } from '../../components/collection/Collection'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getCollectionTC } from '../../store/reducers/collectionsReducer'
import { getCollectionItemsTC } from '../../store/reducers/itemsReducer'
import { ItemsList } from '../lastAddedItemsPage/ItemsList/ItemsList'

import s from './CollectionItems.module.scss'

export const CollectionItems = () => {
  const dispatch = useAppDispatch()
  const { collectionId } = useParams()

  const items = useAppSelector(state => state.items.collectionItems)
  const collection = useAppSelector(state => state.collections.collection)

  useEffect(() => {
    if (collectionId) {
      dispatch(getCollectionItemsTC(collectionId))
      dispatch(getCollectionTC(collectionId))
    }
  }, [collectionId, dispatch])

  return (
    <>
      <BackTo />
      <div className={s.container}>
        <Collection item={collection} full />
        <ItemsList searchText="" items={items} isLoading={false} />
      </div>
    </>
  )
}
