import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import s from "./BackTo.module.css"
import {useTranslation} from "react-i18next";

export const BackTo = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <Button className={s.backTo}
                onClick={() => navigate(-1)}
                icon={<ArrowLeftOutlined/>}
                type="text"
                size="small">
            {t("back")}
        </Button>
    );
};

