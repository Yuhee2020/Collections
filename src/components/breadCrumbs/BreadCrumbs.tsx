import React from 'react';
import {Breadcrumb} from "antd";
import {NavLink} from "react-router-dom";
import {ADMIN_PAGE, BIGGEST_COLLECTIONS, ROOT, USER_PAGE} from "../../pages/rotes/Rotes";
import s from "./BreadCrumbs.module.css"
import {useAppSelector} from "../../store/reducers/Store";
import {useTranslation} from "react-i18next";


export const BreadCrumbs = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
    const isAdmin = useAppSelector(state => state.auth.isAdmin)
    const {t} = useTranslation();

    const changeClassname=({isActive}:{isActive: boolean}) =>
        isActive ? s.activeNavLink : ""

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <NavLink  className={changeClassname} to={ROOT}>{t("lastAdded")}</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <NavLink className={changeClassname} to={BIGGEST_COLLECTIONS}>{t("largestCollection")}</NavLink>
            </Breadcrumb.Item>
            {isLoggedIn && <Breadcrumb.Item>
                <NavLink className={changeClassname} to={USER_PAGE}>{t("userPage")}</NavLink>
            </Breadcrumb.Item>}
            {isAdmin && isLoggedIn && <Breadcrumb.Item>
                <NavLink className={changeClassname} to={ADMIN_PAGE}>{t("adminPage")}</NavLink>
            </Breadcrumb.Item>}
        </Breadcrumb>
    );
};
