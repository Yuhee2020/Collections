import React, {useState} from 'react';
import {Button, Modal} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {CollectionType} from "../../../../api/collectionsApi";
import EditItemForm from "./editItemForm/EditItemForm";
import {ItemType} from "../../../../api/itemsApi";


type PropsType = {
    collection: CollectionType
    disabled:boolean
    item:ItemType
}

export const EditItemModal = ({collection,disabled,item}: PropsType) => {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(!open)
    }

    return (
        <>
            <Button onClick={showModal} disabled={disabled} type="primary" size="small" icon={<EditOutlined/>}>Edit</Button>
            <Modal
                centered
                open={open}
                title="New Item"
                onOk={showModal}
                onCancel={showModal}
                footer={[
                    <EditItemForm key="userId" showModal={showModal} collection={collection} item={item}/>
                ]}
            >
            </Modal>
        </>
    );
};

