import React from 'react';
import {LikeOutlined, MessageOutlined} from '@ant-design/icons';
import {Button, Card, Image, List, Tag} from 'antd';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {likeItemTC} from "../../../store/reducers/itemsReducer";
import {noImage} from "../../../constants";
import s from "./ItemsList.module.scss"
import Highlight from 'react-highlighter';
import {ItemType} from "../../../api/itemsApi";
import {NavLink} from "react-router-dom";
import {COLLECTION_ITEMS, ITEM} from "../../rotes/Rotes";
import {dateFormatter} from "../../../utils/dateFormatter";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "react-responsive";


type PropsType = {
    items: ItemType[]
    searchText?: string
    isLoading: boolean
}

export const ItemsList = ({items, searchText, isLoading}: PropsType) => {

    const dispatch = useAppDispatch()
    const {t} = useTranslation();
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const isBigScreen = useMediaQuery({query: '(min-width: 800px)'})

    const handleLikeClick = (item: ItemType) => {
        dispatch(likeItemTC(item))
    }

    return (
        <List
            className={s.listContainer}
            loading={isLoading}
            itemLayout="vertical"
            size="small"
            pagination={{pageSize: 10}}
            dataSource={items}
            renderItem={(item) => (
                <Card className={s.itemContainer}>
                    <List.Item
                        key={item._id}
                        actions={[
                            <Button type={"text"} disabled={!isLogin} onClick={() => {
                                handleLikeClick(item)
                            }} icon={<LikeOutlined/>}> {item.likesCount}</Button>,
                            <NavLink to={`${ITEM}/${item._id}`}>
                                <Button type={"text"}
                                        icon={<MessageOutlined/>}> {item.commentsCount}
                                </Button>
                            </NavLink>,
                        ]}
                        extra={isBigScreen &&
                            <Image
                                height={160}
                                alt="logo"
                                src={item.image ? item.image : noImage}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={!isBigScreen && <Image width={120}
                                                           src={item.image ? item.image : noImage}/>}
                            title={
                                <NavLink
                                    className={s.title}
                                    to={`${ITEM}/${item._id}`}>
                                    <Highlight search={searchText}>
                                        {item.title}
                                    </Highlight>
                                </NavLink>
                            }
                            description={
                                <div className={s.tagsBox}>
                                    {item.tags?.map(tag =>
                                        <Tag key={tag} color="cyan">
                                            <Highlight search={searchText}>
                                                {tag}
                                            </Highlight>
                                        </Tag>)}
                                    <NavLink className={s.collection} to={`${COLLECTION_ITEMS}/${item.collectionId}`}>{t("collection")}: {item.collectionName}</NavLink>
                                </div>}
                        />
                        <div className={s.descriptionContainer}>
                            <Highlight search={searchText}>
                                {item.description}
                            </Highlight>
                        </div>
                        <div
                            className={s.date}>{dateFormatter(item.itemCreationDate)}</div>
                    </List.Item>
                </Card>
            )}
        />

    )
};