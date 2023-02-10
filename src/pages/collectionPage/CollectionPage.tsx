import React, {useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {getCollectionTC} from "../../store/reducers/collectionReducer";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import CollectionCard from "./collectionCard/CollectionCard";


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
        </div>
    );
};

