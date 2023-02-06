import React from 'react';
import {Breadcrumb} from "antd";
import {NavLink} from "react-router-dom";
import {ADMIN_PAGE, BIGGEST_COLLECTIONS, ROOT, USER_PAGE} from "../../../pages/rotes/Rotes";
import s from "./BreadCrumbs.module.css"
import {useAppSelector} from "../../../store/reducers/Store";


export const BreadCrumbs = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
    const isAdmin = useAppSelector(state => state.auth.isAdmin)

    const changeClassname=({isActive}:{isActive: boolean}) =>
        isActive ? s.activeNavLink : ""

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <NavLink  className={changeClassname} to={ROOT}>Last added</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <NavLink className={changeClassname} to={BIGGEST_COLLECTIONS}>The biggest collections</NavLink>
            </Breadcrumb.Item>
            {isLoggedIn && <Breadcrumb.Item>
                <NavLink className={changeClassname} to={USER_PAGE}>User page</NavLink>
            </Breadcrumb.Item>}
            {isAdmin && isLoggedIn && <Breadcrumb.Item>
                <NavLink className={changeClassname} to={ADMIN_PAGE}>Admin page</NavLink>
            </Breadcrumb.Item>}
        </Breadcrumb>
    );
};
