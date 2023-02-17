import React, {useEffect} from 'react';
import {LikeOutlined, MessageOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Image, List, Tag} from 'antd';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {getItemsTC, likeItemTC} from "../../../store/reducers/itemsReducer";
import {noImage} from "../../../constants";
import s from "./ItemsList.module.css"
import {useAppDebounce} from "../../../hooks";
import Highlight from 'react-highlighter';
import {ItemType} from "../../../api/itemsApi";
import {NavLink} from "react-router-dom";
import {ITEM} from "../../rotes/Rotes";


export const ItemsList = () => {

    const dispatch = useAppDispatch()
    const {lastItems, searchText, itemsIsLoading} = useAppSelector(state => state.items)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const debouncedText = useAppDebounce(searchText, 600)
    const handleLikeClick = (item: ItemType) => {
        dispatch(likeItemTC(item))
    }

    useEffect(() => {
        dispatch(getItemsTC())
    }, [debouncedText])

    return (

        <List
            className={s.listContainer}
            loading={itemsIsLoading}
            itemLayout="vertical"
            size="small"
            pagination={{pageSize: 10}}
            dataSource={lastItems}
            renderItem={(item) => (
                <Card className={s.itemContainer}>
                    <List.Item
                        key={item._id}
                        actions={[
                            <Button type={"text"} disabled={!isLogin} onClick={() => {
                                handleLikeClick(item)
                            }} icon={<LikeOutlined/>}> {item.likesCount}</Button>,
                            <NavLink to={`${ITEM}/${item._id}`}>
                                <Button type={"text"} icon={<MessageOutlined/>}> {item.likesCount}
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
                            title={<NavLink to={`${ITEM}/${item._id}`}>{item.title}</NavLink>}
                            description={item.tags?.map(tag =>
                                <Tag key={tag} color="cyan">
                                    <Highlight search={searchText}>
                                        {tag}
                                    </Highlight>
                                </Tag>)}
                        />

                        <div className={s.descriptionContainer}>
                            <Highlight search={searchText}>
                                {item.description}
                            </Highlight>
                        </div>
                    </List.Item>
                </Card>
            )}
        />

    )
};