import React from 'react';
import {Avatar, Button, Card, Collapse, Image, List, Popconfirm} from "antd";
import {CollectionType} from "../../../api/collectionsApi";
import s from "./CollectionCard.module.css"
import {DeleteOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../../store/reducers/Store";
import {useNavigate} from "react-router-dom";
import {USER_PAGE} from "../../rotes/Rotes";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import {deleteCollectionTC} from "../../../store/reducers/collectionsReducer";
import {useTranslation} from "react-i18next";
import {CollectionModal} from "../../userPage/collectionModal/CollectionModal";
import {ItemModal} from "./ItemModal/ItemModal";


type PropsType = {
    collection: CollectionType
}

export const CollectionCard = ({collection}: PropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation();
    const deleteCollection = (collectionId: string) => {
        navigate(USER_PAGE)
        collection.userId && dispatch(deleteCollectionTC({collectionId, userId: collection.userId}))
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
                        <CollectionModal edit userId={collection.userId} collection={collection}/>,
                        <Popconfirm
                            placement="topLeft"
                            title={t("sureDelete")}
                            onConfirm={() => {
                                collection._id && deleteCollection(collection._id)
                            }}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <Button type="text" icon={<DeleteOutlined/>}>{t("delete")}</Button>
                        </Popconfirm>,
                        <ItemModal collection={collection}/>
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
                                <div>{t("theme")}: {collection.theme} </div>
                                <div>{t("dateOfCreation")}: {dayjs(collection.creationDate).format("DD-MMM-YYYY HH:mm:ss")} </div>
                            </div>}
                    />
                    <Collapse bordered={false}>
                        <Collapse.Panel header={t("descriptions")} key="1">
                            {collection.description && <ReactMarkdown children={collection.description}/>}
                        </Collapse.Panel>
                    </Collapse>
                </List.Item>
            </List>
        </Card>
    );
};

export default CollectionCard;