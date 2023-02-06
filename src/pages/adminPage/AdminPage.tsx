import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getUsersTC} from "../../store/reducers/usersReducer";
import {Card, Checkbox, List} from "antd";
import {Navigate, NavLink} from "react-router-dom";
import {ROOT, USER_PAGE} from "../rotes/Rotes";
import s from "./AdminPage.module.css"
import {Toolbar} from "./toolbar/Toolbar";


export const AdminPage = () => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.users)
    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
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
        <div>
            <Toolbar usersId={usersId}/>
            <Card className={s.listContainer}>
                <List
                    dataSource={users}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={(item) => (
                        <List.Item className={s.itemContainer} >
                                <Checkbox className={s.checkbox} onChange={(e) => {
                                handleCheckboxClick(e.target.checked, item._id)
                            }}/>
                                <List.Item.Meta
                                    title={<NavLink to={USER_PAGE}>{item.email}</NavLink>}
                                    description={`role: ${item.role} status: ${item.isBlocked ? "blocked" : "unlocked"}`}
                                />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

