import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import CollectionCard from "./collectionCard/CollectionCard";
import {getCollectionTC} from "../../store/reducers/collectionsReducer";
import {ItemsTable} from "./itemsTable/ItemsTable";
import {BackTo} from "../../components/backTo/BackTo";
import s from "./CollectionPage.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks";


export const CollectionPage = () => {

    const {collectionId} = useParams()
    const dispatch = useAppDispatch()
    const collection = useAppSelector(state => state.collections.collection)

    useEffect(() => {
        collectionId && dispatch(getCollectionTC(collectionId))
    }, [])



    return (
        <div className={s.container}>
            <BackTo/>
            <CollectionCard collection={collection}/>
            <ItemsTable collection={collection}/>
        </div>
    );
};

