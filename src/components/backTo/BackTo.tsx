import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import s from "./BackTo.module.css"

export const BackTo = () => {
    const navigate = useNavigate();
    return (
        <Button className={s.backTo}
                onClick={()=>navigate(-1)}
                icon={<ArrowLeftOutlined/>}
                type="text"
                size="small" >
                Back
        </Button>
    );
};

