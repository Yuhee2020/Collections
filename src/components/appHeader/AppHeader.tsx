import React from 'react';
import {Button, Select, Switch} from "antd";
import s from "./AppHeader.module.css"
import {Moon} from "./icons/Moon";
import {Sun} from "./icons/Sun";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {LanguageType, setLanguageTC, setThemeTC} from "../../store/reducers/appReducer";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "../../pages/rotes/Rotes";
import {logoutTC} from "../../store/reducers/authReducer";
import {BreadCrumbs} from "../breadCrumbs/BreadCrumbs";
import {AppSearch} from "../appSearch/AppSearch";
import {HeaderMenu} from "../headerMenu/HeaderMenu";


export const AppHeader = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.auth.isLogin)

    const theme = useAppSelector(state => state.app.theme)

    const handleSwitchChange = (e: boolean) => {
        dispatch(setThemeTC(e ? "dark" : "light"))
    }
    const handleLoginClick = () => {
        navigate(LOGIN)
    }
    const handleLogoutClick = () => {
        dispatch(logoutTC())
    }
    const handleLangSelect=(e:string)=>{
        const lang=e as LanguageType
        dispatch(setLanguageTC(lang))
    }


    return (
        <div className={s.headerContainer}>
            <HeaderMenu/>
            <BreadCrumbs/>
            <div className={s.search}><AppSearch/></div>
            <div className={s.buttonsGroup}>
                <Switch
                    onChange={handleSwitchChange}
                    checked={theme === "dark"}
                    checkedChildren={<Sun/>}
                    unCheckedChildren={<Moon/>}
                    defaultChecked
                />
                <Select
                    defaultValue="eng"
                    style={{width: 70}}
                    onSelect={handleLangSelect}
                    options={[
                        {value: 'eng', label: 'Eng'},
                        {value: 'ru', label: 'Ру'},
                    ]}
                />
                {isLoggedIn
                    ? <Button onClick={handleLogoutClick}>Logout</Button>
                    : <Button onClick={handleLoginClick}>Login</Button>}
            </div>
        </div>
    );
};
