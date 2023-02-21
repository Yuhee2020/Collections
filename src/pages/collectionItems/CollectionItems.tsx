import React, {useEffect} from 'react';
import {ItemsList} from "../lastAddedItemsPage/ItemsList/ItemsList";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getCollectionItemsTC} from "../../store/reducers/itemsReducer";
import {BackTo} from "../../components/backTo/BackTo";
import s from "./CollectionItems.module.css"

export const CollectionItems = () => {

    const dispatch = useAppDispatch()
    const {collectionId} = useParams()

    const items = useAppSelector(state => state.items.collectionItems)

    useEffect(() => {
        collectionId && dispatch(getCollectionItemsTC(collectionId))
    }, [])
    return (
        <>
            <BackTo/>
            <div className={s.container}>
                <ItemsList searchText={''} items={items} isLoading={false}/>
            </div>
        </>
    );
};

