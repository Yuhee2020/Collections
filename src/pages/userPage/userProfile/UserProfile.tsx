import React from 'react';
import s from "./UserProfile.module.scss";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {useTranslation} from "react-i18next";
import {CollectionModal} from "../../../components/collectionModal/CollectionModal";
import {UserType} from "../../../api/authApi";

type PropsType = {
    user: UserType | null
}

export const UserProfile = ({user}: PropsType) => {
    const {t} = useTranslation();

    return (
        <Card
            className={s.profileBox}
            actions={[
                <CollectionModal userId={user?._id}/>,
            ]}
        >
            <Meta
                avatar={<Avatar/>}
                title={user?.email}
                description={<>
                    <div>{`${t("role")}: ${user?.role}`}</div>
                </>}
            />
        </Card>
    );
};

