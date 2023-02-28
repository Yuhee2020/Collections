import React from 'react';
import {Avatar, Button, Card, Collapse, Image, List, Popconfirm} from "antd";
import s from "./CollectionCard.module.scss"
import {DeleteOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {USER_PAGE} from "../../rotes/Rotes";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import {deleteCollectionTC} from "../../../store/reducers/collectionsReducer";
import {useTranslation} from "react-i18next";
import {CollectionModal} from "../../../components/collectionModal/CollectionModal";
import {ItemModal} from "../../../components/ItemModal/ItemModal";
import {useMediaQuery} from "react-responsive";
import {useAppDispatch} from "../../../hooks";
import {CollectionType} from "../../../api/collectionsApi";


type PropsType = {
    collection: CollectionType
}

export const CollectionCard = ({collection}: PropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery({query: '(max-width: 800px)'})
    const {t} = useTranslation();
    const deleteCollection = (collectionId: string) => {
        navigate(USER_PAGE)
        collection.userId && dispatch(deleteCollectionTC({
            collectionId,
            userId: collection.userId
        }))
    }

    return (
        <Card className={s.collectionCard}>
            <List
                itemLayout="vertical"
                size="small"
            >
                <List.Item
                    key={collection.title}
                    extra={!isSmallScreen &&
                        <Image
                            height={130}
                            alt="logo"
                            src={collection.image}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={isSmallScreen &&
                            <Avatar shape="square" size={70} src={collection.image}/>}
                        title={<div className={s.title}>{collection.title}</div>}
                        description={
                            <div className={s.cardBody}>
                                <div>{t("theme")}: {collection.theme} </div>
                                <div>{t("dateOfCreation")}: {dayjs(collection.creationDate).format("DD-MMM-YYYY HH:mm:ss")} </div>
                            </div>}
                    />
                    <Collapse bordered={false}>
                        <Collapse.Panel header={t("descriptions")} key="1">
                            <div className={s.description}>{collection.description &&
                                <ReactMarkdown children={collection.description}/>}</div>
                        </Collapse.Panel>
                    </Collapse>
                    <div className={s.buttons}>
                        <CollectionModal edit userId={collection.userId}
                                         collection={collection}/>
                        <Popconfirm
                            placement="topLeft"
                            title={t("sureDelete")}
                            onConfirm={() => {
                                collection._id && deleteCollection(collection._id)
                            }}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <Button type="text"
                                    icon={<DeleteOutlined/>}>{t("delete")}</Button>
                        </Popconfirm>
                        <ItemModal collection={collection}/>
                    </div>
                </List.Item>
            </List>
        </Card>
    );
};

export default CollectionCard;