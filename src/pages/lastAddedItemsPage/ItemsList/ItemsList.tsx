import React from 'react';
import {LikeOutlined, MessageOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Image, List, Tag} from 'antd';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {likeItemTC} from "../../../store/reducers/itemsReducer";
import {noImage} from "../../../constants";
import s from "./ItemsList.module.css"
import Highlight from 'react-highlighter';
import {ItemType} from "../../../api/itemsApi";
import {NavLink} from "react-router-dom";
import {ITEM} from "../../rotes/Rotes";
import {dateFormatter} from "../../../utils/dateFormatter";


type PropsType = {
    items: ItemType[]
    searchText?: string
    isLoading: boolean
}

export const ItemsList = ({items, searchText, isLoading}: PropsType) => {

    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)

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
                                <Button type={"text"} icon={<MessageOutlined/>}> {item.commentsCount}
                                </Button>
                            </NavLink>,
                        ]}
                        extra={
                            <Image
                                height={100}
                                alt="logo"
                                src={item.image ? item.image : noImage}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.image ? item.image : noImage}/>}
                            title={
                                <NavLink
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
                                <div className={s.collection}>collection: {item.collectionName}</div>
                            </div>}
                        />
                        <div>
                            <div className={s.descriptionContainer}>
                                <Highlight search={searchText}>
                                    {item.description}
                                </Highlight>
                            </div>
                            <div className={s.collection}>{dateFormatter(item.itemCreationDate)}</div>
                        </div>
                    </List.Item>
                </Card>
            )}
        />

    )
};