import React, {useEffect} from 'react';
import {ItemsList} from "../lastAddedItemsPage/ItemsList/ItemsList";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getCollectionItemsTC} from "../../store/reducers/itemsReducer";
import {BackTo} from "../../components/backTo/BackTo";
import s from "./CollectionItems.module.scss"
import {Collection} from "../../components/collection/Collection";
import {getCollectionTC} from "../../store/reducers/collectionsReducer";

export const CollectionItems = () => {

    const dispatch = useAppDispatch()
    const {collectionId} = useParams()

    const items = useAppSelector(state => state.items.collectionItems)
    const collection = useAppSelector(state => state.collections.collection)

    useEffect(() => {
        if (collectionId) {
            dispatch(getCollectionItemsTC(collectionId))
            dispatch(getCollectionTC(collectionId))
        }
    }, [collectionId])
    return (
        <>
            <BackTo/>
            <div className={s.container}>
                <Collection item={collection} full/>
                    <ItemsList
                        searchText={''}
                        items={items}
                        isLoading={false}/>
            </div>
        </>
    );
};

