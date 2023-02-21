import React, {ChangeEvent, useEffect} from 'react';
import Search from "antd/es/input/Search";
import {setItemsIsLoading, setSearch} from "../../../store/reducers/itemsReducer";
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {useLocation, useNavigate} from "react-router-dom";
import {ROOT} from "../../../pages/rotes/Rotes";

export const AppSearch = () => {
    const {pathname}=useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {searchText, itemsIsLoading} = useAppSelector(state => state.items)
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.currentTarget.value))
        dispatch(setItemsIsLoading(true))
    }

    useEffect(()=>{
        searchText
        &&  pathname!==ROOT
        && navigate(ROOT)
    },[searchText])


    return (
        <Search
            loading={itemsIsLoading}
            placeholder="search items"
            value={searchText}
            onChange={handleSearchChange}
        />
    );
};
