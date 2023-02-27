import React from 'react';
import {
    MenuUnfoldOutlined,
    ProfileOutlined,
    ScheduleOutlined,
    UserOutlined,
    ReconciliationOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Dropdown} from 'antd';
import {ADMIN_PAGE, BIGGEST_COLLECTIONS, ROOT, USER_PAGE} from "../../pages/rotes/Rotes";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../store/reducers/Store";
import {useTranslation} from "react-i18next";
import s from "./HeaderMenu.module.scss"


export const HeaderMenu = () => {

    const {t} = useTranslation();
    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
    const isAdmin = useAppSelector(state => state.auth.isAdmin)

    const changeClassname = ({isActive}: { isActive: boolean }) =>
        isActive ? s.activeNavLink : s.navLink

    const items: MenuProps['items'] = [
        {
            label: <NavLink className={changeClassname}
                            to={ROOT}><ScheduleOutlined/> {t("lastAdded")}</NavLink>,
            key: '0',
        },
        {
            label: <NavLink className={changeClassname}
                            to={BIGGEST_COLLECTIONS}><ProfileOutlined/> {t("largestCollection")}
            </NavLink>,
            key: '1',
        },
        {
            label: isLoggedIn && <NavLink className={changeClassname}
                                          to={USER_PAGE}><UserOutlined/> {t("userPage")}
            </NavLink>,
            key: '3',
        },
        {
            label: isAdmin && isLoggedIn &&
                <NavLink className={changeClassname}
                         to={ADMIN_PAGE}><ReconciliationOutlined /> {t("adminPage")}</NavLink>,
            key: '4',
        },
    ];

    return (
        <Dropdown
            menu={{items}}
            trigger={['click']}>
            <Button size="large" icon={<MenuUnfoldOutlined  className={s.icon}/>} type="text"/>
        </Dropdown>
    )
};