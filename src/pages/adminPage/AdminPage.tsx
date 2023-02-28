import React, {useEffect, useState} from 'react';
import {getUsersTC} from "../../store/reducers/usersReducer";
import {Card, Checkbox, List} from "antd";
import {Navigate, NavLink} from "react-router-dom";
import {ROOT, USER_PROFILE} from "../rotes/Rotes";
import s from "./AdminPage.module.scss"
import {Toolbar} from "./toolbar/Toolbar";
import {ItemField} from "../../components/itemField/ItemField";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hooks";


export const AdminPage = () => {

    const dispatch = useAppDispatch()

    const users = useAppSelector(state => state.users.users)
    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
    const {t} = useTranslation();
    const [usersId, setUsersId] = useState<string[]>([])

    const handleCheckboxClick = (e: boolean, id: string) => {
        if (e && !usersId.some(userId => userId === id)) {
            setUsersId([...usersId, id])
        }
        if (!e) {
            setUsersId(usersId.filter(userId => userId !== id))
        }
    }


    useEffect(() => {
        dispatch(getUsersTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={ROOT}/>
    }


    return (
        <div className={s.pageContainer}>
            <Toolbar usersId={usersId}/>
            <Card className={s.card}>
                <List
                    dataSource={users}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={(item) => (
                        <List.Item className={s.itemContainer}>
                            <Checkbox className={s.checkbox} onChange={(e) => {
                                handleCheckboxClick(e.target.checked, item._id)
                            }}/>
                            <List.Item.Meta
                                title={<NavLink to={`${USER_PROFILE}/${item._id}`}>{item.email}</NavLink>}
                                description={ <div className={s.userFields}>
                                    <ItemField fieldTitle={t("role")}>{item.role}</ItemField>
                                    <ItemField fieldTitle={t("status")}>{item.isBlocked ? "blocked" : "unlocked"}</ItemField>
                                    <ItemField fieldTitle={t("registrationDate")}>{item.registrationDate}</ItemField>
                                    <ItemField fieldTitle={t("lastLoginDate")}>{item.lastLoginDate}</ItemField>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

