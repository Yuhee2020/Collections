import React from 'react';
import {Avatar, Button, Card, Collapse, Image, List, Popconfirm} from "antd";
import {CollectionType} from "../../../api/collectionsApi";
import s from "./CollectionCard.module.css"
import {EditCollectionModal} from "../../userPage/editCollectionModal/EditCollectionModal";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteUserCollectionTC} from "../../../store/reducers/collectionReducer";
import {useAppDispatch} from "../../../store/reducers/Store";
import {useNavigate} from "react-router-dom";
import {USER_PAGE} from "../../rotes/Rotes";
import dayjs from "dayjs";

type PropsType = {
    collection: CollectionType
}

export const CollectionCard = ({collection}: PropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const deleteCollection = (collectionId: string) => {
        navigate(USER_PAGE)
        collection.userId && dispatch(deleteUserCollectionTC({collectionId, userId: collection.userId}))
    }

    return (
        <Card className={s.collectionCard}>
            <List
                itemLayout="vertical"
                size="small"
            >
                <List.Item
                    key={collection.title}
                    actions={[
                        <EditCollectionModal userId={collection.userId} collection={collection}/>,
                        <Popconfirm
                            placement="topLeft"
                            title={"Are you sure to delete this collection?"}
                            onConfirm={() => {
                                collection._id && deleteCollection(collection._id)
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="text" icon={<DeleteOutlined/>}>delete</Button>
                        </Popconfirm>
                    ]}
                    extra={
                        <Image
                            height={130}
                            alt="logo"
                            src={collection.image}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={collection.image}/>}
                        title={collection.title}
                        description={
                            <div>
                                <div>Theme: {collection.theme} </div>
                                <div>CreationDate: {dayjs(collection.creationDate).format("DD-MMM-YYYY HH:mm:ss")} </div>
                            </div>}
                    />
                    <Collapse bordered={false}>
                        <Collapse.Panel header="Descriptions" key="1">
                            <p>{collection.description}</p>
                        </Collapse.Panel>
                    </Collapse>
                </List.Item>
            </List>
        </Card>
    );
};

export default CollectionCard;