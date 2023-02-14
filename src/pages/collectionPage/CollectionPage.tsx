import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import CollectionCard from "./collectionCard/CollectionCard";
import {getCollectionTC} from "../../store/reducers/collectionsReducer";
import {ItemsTable} from "./itemsTable/ItemsTable";


export const CollectionPage = () => {

    const {collectionId} = useParams()
    const dispatch = useAppDispatch()
    const collection = useAppSelector(state => state.collections.collection)

    useEffect(() => {
        collectionId && dispatch(getCollectionTC(collectionId))
    }, [])



    return (
        <div>
            <CollectionCard collection={collection}/>
            <ItemsTable collection={collection}/>
        </div>
    );
};

