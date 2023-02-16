import React, {useEffect} from 'react';
import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {Avatar, Card, List, Space} from 'antd';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {getLastItemsTC} from "../../../store/reducers/itemsReducer";
import {noImage} from "../../../constants";
import s from "./LastAddedList.module.css"



const IconText = ({icon, text}: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


export const LastAddedList = () => {

    const dispatch = useAppDispatch()
    const lastAddedItems = useAppSelector(state => state.items.lastItems)

    useEffect(() => {
        dispatch(getLastItemsTC())
    }, [])

    return (
        <Card className={s.listContainer}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={lastAddedItems}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                        ]}
                        extra={
                            <img
                                height={150}
                                alt="logo"
                                src={item.image ? item.image : noImage}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.image ? item.image : noImage}/>}
                            title={<a>{item.title}</a>}
                            description={item.description}
                        />
                        {item.tags}
                    </List.Item>
                )}
            />
        </Card>
    )
};