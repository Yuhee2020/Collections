import React, {useEffect} from 'react';
import {ItemsSearch} from "./itemsSearch/ItemsSearch";
import s from "./LastAddedItemsPage.module.scss"
import {getItemsTC} from "../../store/reducers/itemsReducer";
import {useAppDebounce, useAppDispatch, useAppSelector} from "../../hooks";
import {ItemsList} from "./ItemsList/ItemsList";
import {useMediaQuery} from "react-responsive";

export const LastAddedItemsPage = () => {

    const {lastItems, searchText, itemsIsLoading} = useAppSelector(state => state.items)
    const dispatch = useAppDispatch()
    const isSmallScreen = useMediaQuery({ query: '(min-width: 800px)' })
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
            {isSmallScreen && <ItemsSearch/>}
        </div>
    );
};

