import React, {useEffect, useState} from 'react';
import {Button, Card, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {NavLink} from "react-router-dom";
import {ITEM} from "../../rotes/Rotes";
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {deleteItemsTC, getCollectionItemsTC} from "../../../store/reducers/itemsReducer";
import {CollectionType} from "../../../api/collectionsApi";
import dayjs from "dayjs";
import {getTagsTC} from "../../../store/reducers/tagsReducer";
import s from "./Toolbar.module.css";
import {DeleteOutlined} from "@ant-design/icons";
import {dateFormatter} from "../../../utils/dateFormatter";
import {ItemModal} from "../collectionCard/addItemModal/ItemModal";

export interface DataType {
    key: React.Key;
    title: string;
    itemId: string;
    itemCreationDate: string;
    tags: string;
    likesCount: number
    image:string
}

type PropsType = {
    collection: CollectionType
}

export const ItemsTable = ({collection}: PropsType) => {

    const dispatch = useAppDispatch()
    const collectionItems = useAppSelector(state => state.items.collectionItems)
    const [selectedItems, setSelectedItems] = useState<DataType[]>([])
    const editableItem = collectionItems.filter(item => item._id === selectedItems[0]?.itemId)[0]
    const tags = useAppSelector(state => state.tags.tags)
    const columns: ColumnsType<DataType> = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text: string, item) => <NavLink to={`${ITEM}/${item.itemId}`}>{text}</NavLink>,
        },
        {
            title: 'ItemId',
            dataIndex: 'itemId',
        },
        {
            title: 'Creation Date',
            dataIndex: 'itemCreationDate',
            sorter: (a, b) => dayjs(a.itemCreationDate).unix() - dayjs(b.itemCreationDate).unix()
        },
        {
            title: 'Likes count',
            dataIndex: 'likesCount',
            sorter: (a, b) => a.likesCount - b.likesCount
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            filters: tags.map(tag => ({text: tag.title, value: tag.title})),
            onFilter: (value: any, record) => record.tags.indexOf(value) === 0,
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
           setSelectedItems(selectedRows)

        },
    };

    const data = collectionItems.map((item: any) => ({
        key: item._id,
        itemId: item._id,
        title: item.title,
        itemCreationDate: dateFormatter(item.itemCreationDate),
        tags: item.tags?.join(", "),
        likesCount: item.likesCount,
        image:item.image
    }))


    const handleDeleteClick = () => {
        collection._id &&
        dispatch(deleteItemsTC({items: selectedItems, collectionId: collection._id}))
    }


    useEffect(() => {
        collection._id && dispatch(getCollectionItemsTC(collection._id))
        dispatch(getTagsTC())
    }, [collection._id])

    return (
        <div>
            <Card className={s.cardBox}>
                <div className={s.toolbarContainer}>
                    <Button type="primary" onClick={handleDeleteClick}
                            icon={<DeleteOutlined/>}
                            size="small"
                            disabled={!selectedItems.length}>
                        Delete
                    </Button>
                    <ItemModal
                        collection={collection}
                        item={editableItem}
                        disabled={selectedItems.length !== 1}
                        edit
                    />
                </div>
            </Card>
            <Table
                bordered
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
        ;
};


