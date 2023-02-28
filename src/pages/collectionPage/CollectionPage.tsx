import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { BackTo } from '../../components/backTo/BackTo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getCollectionTC } from '../../store/reducers/collectionsReducer'

import CollectionCard from './collectionCard/CollectionCard'
import s from './CollectionPage.module.scss'
import { ItemsTable } from './itemsTable/ItemsTable'

export const CollectionPage = () => {
  const { collectionId } = useParams()
  const dispatch = useAppDispatch()
  const collection = useAppSelector(state => state.collections.collection)

  useEffect(() => {
    collectionId && dispatch(getCollectionTC(collectionId))
  }, [dispatch, collectionId])

  return (
    <div className={s.container}>
      <BackTo />
      <CollectionCard collection={collection} />
      <ItemsTable collection={collection} />
    </div>
  )
}
