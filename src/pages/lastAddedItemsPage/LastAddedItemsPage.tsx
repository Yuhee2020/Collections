import React, {useEffect} from 'react';
import {ItemsSearch} from "./itemsSearch/ItemsSearch";
import s from "./LastAddedItemsPage.module.css"
import {getItemsTC} from "../../store/reducers/itemsReducer";
import {useAppDebounce} from "../../hooks";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {ItemsList} from "./ItemsList/ItemsList";

export const LastAddedItemsPage = () => {

    const {lastItems, searchText, itemsIsLoading} = useAppSelector(state => state.items)
    const dispatch = useAppDispatch()
    const debouncedText = useAppDebounce(searchText, 600)

    useEffect(() => {
        dispatch(getItemsTC())
    }, [debouncedText])

    return (
        <div className={s.pageContainer}>
            <ItemsList
                items={lastItems}
                searchText={searchText}
                isLoading={itemsIsLoading}/>
            <ItemsSearch/>
        </div>
    );
};

