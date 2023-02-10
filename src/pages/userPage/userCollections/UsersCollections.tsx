import React, {useEffect} from 'react';
import {Button, Card, Image, List, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {COLLECTION} from "../../rotes/Rotes";
import {noImage} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {deleteUserCollectionTC, getUserCollectionsTC} from "../../../store/reducers/collectionReducer";
import ReactMarkdown from 'react-markdown'
import s from "./UsersCollections.module.css"
import {EditCollectionModal} from "../editCollectionModal/EditCollectionModal";


type PropsType = {
    userId?: string
}

export const UsersCollections = ({userId}: PropsType) => {

    const dispatch = useAppDispatch()
    const collections = useAppSelector(state => state.collections.userCollections)
    const deleteCollection = (collectionId: string) => {
        userId && dispatch(deleteUserCollectionTC({collectionId, userId}))
    }

    useEffect(() => {
        userId && dispatch(getUserCollectionsTC(userId))
    }, [userId])

    return (
        <Card className={s.userCollectionsBox}>
            <List
                itemLayout="vertical"
                pagination={{
                    pageSize: 5,
                }}
                dataSource={collections}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <EditCollectionModal userId={userId} collection={item}/>,
                            <Popconfirm
                                placement="topLeft"
                                title={"Are you sure to delete this collection?"}
                                onConfirm={() => {
                                    item._id && deleteCollection(item._id)
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="text" icon={<DeleteOutlined/>}>delete</Button>
                            </Popconfirm>
                        ]}
                        extra={
                            <Image
                                height={150}
                                src={item.image ? item.image : noImage}
                                fallback={noImage}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<NavLink to={`${COLLECTION}/${item._id}`}>{item.title}</NavLink>}
                            description={item.theme}
                        />
                        {item.description && <ReactMarkdown children={item.description}/>}
                    </List.Item>
                )}
            />
        </Card>
    );
};

