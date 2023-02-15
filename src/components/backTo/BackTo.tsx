import React from 'react';
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import s from "./BackTo.module.css"

type PropsType = {
    path: string
    title: string
}

export const BackTo = ({path, title}: PropsType) => {
    return (
        <Button className={s.backTo} icon={<ArrowLeftOutlined/>} type="text" size="small" >
            <NavLink to={path}>
                Back to {title}
            </NavLink>
        </Button>
    );
};

