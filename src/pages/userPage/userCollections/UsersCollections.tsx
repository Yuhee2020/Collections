import React, {useEffect} from 'react';
import {Button, Card, Image, List, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {COLLECTION} from "../../rotes/Rotes";
import {noImage} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import ReactMarkdown from 'react-markdown'
import s from "./UsersCollections.module.css"
import {deleteCollectionTC, getCollectionsTC} from "../../../store/reducers/collectionsReducer";
import {useTranslation} from "react-i18next";
import {CollectionModal} from "../collectionModal/CollectionModal";



type PropsType = {
    userId?: string
}

export const UsersCollections = ({userId}: PropsType) => {

    const dispatch = useAppDispatch()
    const {t} = useTranslation();
    const collections = useAppSelector(state => state.collections.collections)
    const deleteCollection = (collectionId: string) => {
        userId && dispatch(deleteCollectionTC({collectionId, userId}))
    }

    useEffect(() => {
        dispatch(getCollectionsTC(userId))
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
                            <CollectionModal edit userId={userId} collection={item}/>,
                            <Popconfirm
                                placement="topLeft"
                                title={t("sureDelete")}
                                onConfirm={() => {
                                    item._id && deleteCollection(item._id)
                                }}
                                okText={t("yes")}
                                cancelText={t("no")}
                            >
                                <Button type="text" icon={<DeleteOutlined/>}>{t("delete")}</Button>
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

