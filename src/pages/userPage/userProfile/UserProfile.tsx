import React from 'react';
import s from "../UserPage.module.css";
import {Avatar, Button, Card} from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {ADD_COLLECTION} from "../../rotes/Rotes";
import {useAppSelector} from "../../../store/reducers/Store";
import {useNavigate, useParams} from "react-router-dom";
import {AddCollectionModal} from "../../../components/modals/AddCollectionModal";

export const UserProfile = () => {

    const navigate=useNavigate()
    const {userId} = useParams()

    const user =useAppSelector(userId? state => state.users.userProfile : state=>state.auth.user)

    const handleNewCollectionClick=()=>{
        navigate(`${ADD_COLLECTION}/${userId?userId:user?._id}`)
    }

    return (
        <Card
            className={s.cardBox}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <AddCollectionModal/>,
                <Button onClick={handleNewCollectionClick} icon={<AppstoreAddOutlined/>}>add new collection</Button>
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

