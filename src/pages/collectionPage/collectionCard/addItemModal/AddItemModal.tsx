import React, {useState} from 'react';
import {Button, Modal} from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";
import AddItemForm from "./addItemForm/AddItemForm";
import {CollectionType} from "../../../../api/collectionsApi";


type PropsType = {
    collection: CollectionType
}

export const AddItemModal = ({collection}: PropsType) => {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(!open)}

    return (
        <>
            <Button onClick={showModal} type="text" icon={<AppstoreAddOutlined/>}>add item</Button>
            <Modal
                centered
                open={open}
                title="New Item"
                onOk={showModal}
                onCancel={showModal}
                footer={[
                    <AddItemForm key="userId" showModal={showModal} collection={collection}/>
                ]}
            >
            </Modal>
        </>
    );
};

