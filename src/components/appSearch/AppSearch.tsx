import React, {ChangeEvent, useEffect} from 'react';
import Search from "antd/es/input/Search";
import {setItemsAreLoading, setSearch} from "../../store/reducers/itemsReducer";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {useLocation, useNavigate} from "react-router-dom";
import {ROOT} from "../../pages/rotes/Rotes";
import {useTranslation} from "react-i18next";

export const AppSearch = () => {
    const {pathname}=useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {t} = useTranslation();
    const {searchText, itemsIsLoading} = useAppSelector(state => state.items)
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.currentTarget.value))
        dispatch(setItemsAreLoading(true))
    }

    useEffect(()=>{
        searchText
        &&  pathname!==ROOT
        && navigate(ROOT)
    },[searchText])



    return (
        <Search
            size={"large"}
            loading={itemsIsLoading}
            // @ts-ignore
            placeholder={t("itemsSearch")}
            value={searchText}
            onChange={handleSearchChange}
        />
    );
};
