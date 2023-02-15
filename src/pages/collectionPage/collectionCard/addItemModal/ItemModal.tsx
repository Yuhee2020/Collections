import React, {useState} from 'react';
import {Button, Modal} from "antd";
import {AppstoreAddOutlined, EditOutlined} from "@ant-design/icons";
import {CollectionType} from "../../../../api/collectionsApi";
import {ItemForm} from "./itemForm/ItemForm"
import {ItemType} from "../../../../api/itemsApi";


type PropsType = {
    collection: CollectionType
    edit?: boolean
    disabled?: boolean
    item?:ItemType
}

export const ItemModal = ({collection, edit, disabled, item}: PropsType) => {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(!open)
    }

    return (
        <>
            {edit
                ?<Button onClick={showModal} disabled={disabled} type="primary" size="small"
                     icon={<EditOutlined/>}>Edit</Button>
                :<Button onClick={showModal} type="text" icon={<AppstoreAddOutlined/>}>add item</Button>}
            <Modal
                centered
                open={open}
                title="New Item"
                onOk={showModal}
                onCancel={showModal}
                footer={[
                    <ItemForm key="userId"
                              showModal={showModal}
                              collection={collection}
                              item={item}
                              edit={edit}/>
                ]}
            >
            </Modal>
        </>
    );
};

