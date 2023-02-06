import React from 'react';
import {Button, Input, Select, Switch} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import s from "./AppHeader.module.css"
import {Moon} from "./icons/Moon";
import {Sun} from "./icons/Sun";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {setThemeTC} from "../../store/reducers/appReducer";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "../../pages/rotes/Rotes";
import {logoutTC} from "../../store/reducers/authReducer";
import {BreadCrumbs} from "./breadCrumbs/BreadCrumbs";


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


    return (
        <div className={s.headerContainer}>
            <BreadCrumbs/>
            <Input prefix={<SearchOutlined className="site-form-item-icon"/>} placeholder="Search..."
                   className={s.search}/>
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
