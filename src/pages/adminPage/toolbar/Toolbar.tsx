import React from 'react';
import {Button, Card, Tooltip} from "antd";
import {DeleteOutlined, LockOutlined, UnlockOutlined, UserOutlined} from "@ant-design/icons";
import {blockUsersTC, changeUsersRoleTC, deleteUsersTC, unlockUsersTC} from "../../../store/reducers/usersReducer";
import {useAppDispatch} from "../../../store/reducers/Store";
import s from "./Toolbar.module.css"

type PropsType = {
    usersId: string[]
}

export const Toolbar = ({usersId}: PropsType) => {

    const dispatch = useAppDispatch()

    const handleDeleteClick = () => {
        dispatch(deleteUsersTC(usersId))
    }
    const handleBlockClick = () => {
        dispatch(blockUsersTC(usersId))
    }
    const handleUnlockClick = () => {
        dispatch(unlockUsersTC(usersId))
    }
    const handleChangeRoleClick = () => {
        dispatch(changeUsersRoleTC(usersId))
    }
    return (
        <Card className={s.cardBox}>
            <div className={s.toolbarContainer}><Tooltip title="delete user" placement="bottom">
                <Button type="primary" onClick={handleDeleteClick}
                        icon={<DeleteOutlined/>}
                        size="large"/>
            </Tooltip>
                <Tooltip title="block user" placement="bottom">
                    <Button type="primary"
                            onClick={handleBlockClick} icon={<LockOutlined/>}
                            size="large"/>
                </Tooltip>
                <Tooltip title="unlock user" placement="bottom">
                    <Button type="primary"
                            onClick={handleUnlockClick} icon={<UnlockOutlined/>}
                            size="large"/>
                </Tooltip>
                <Tooltip title="change users role" placement="bottom">
                    <Button onClick={handleChangeRoleClick} type="primary" icon={<UserOutlined/>}
                            size="large">
                        Change role
                    </Button>
                </Tooltip></div>
        </Card>
    );
};
