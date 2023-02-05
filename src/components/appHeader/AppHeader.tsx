import React from 'react';
import {Breadcrumb, Button, Input, Select, Switch} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import s from "./AppHeader.module.css"
import {Moon} from "./icons/Moon";
import {Sun} from "./icons/Sun";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {setThemeTC} from "../../store/reducers/appReducer";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_PAGE, BIGGEST_COLLECTIONS, LOGIN, ROOT, USER_PAGE} from "../../pages/rotes/Rotes";
import {logoutTC} from "../../store/reducers/authReducer";


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
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={ROOT}>Last added</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={BIGGEST_COLLECTIONS}>The biggest collections</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={USER_PAGE}>User page</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={ADMIN_PAGE}>Admin page</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
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
