import React from 'react';
import s from "./UserProfile.module.css";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {AddCollectionModal} from "../addCollectionModal/AddCollectionModal";
import {UserType} from "../../../api/authApi";

type PropsType = {
    user: UserType | null
}

export const UserProfile = ({user}: PropsType) => {

    return (
        <Card
            className={s.profileBox}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <AddCollectionModal userId={user?._id}/>,
            ]}
        >
            <Meta
                avatar={<Avatar/>}
                title={user?.email}
                description={<>
                    <div>{`role: ${user?.role}`}</div>
                    <div>{`collections count: ${user?.reviewsCount}`}</div>
                </>}
            />
        </Card>
    );
};

