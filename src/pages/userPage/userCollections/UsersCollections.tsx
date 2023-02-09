import React from 'react';
import {Button, Card, List} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

export const UsersCollections = () => {
    return (
        <Card>
            <List
                itemLayout="vertical"
                pagination={{
                    pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <Button  type="text" icon={<EditOutlined/>}>edit</Button>,
                            <Button  type="text" icon={<DeleteOutlined/>}>delete</Button>,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </Card>
    );
};

