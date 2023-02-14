import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";
import {useFormik} from "formik";
import s from "./AddcollectionModal.module.css"
import MDEditor from "@uiw/react-md-editor";
import {useAppDispatch} from "../../../store/reducers/Store";
import {validateAddCollectionForm} from "../../../utils/addCollectionFormValidation";
import {COLLECTIONS_THEMES} from "../../../constants";
import {createCollectionTC} from "../../../store/reducers/collectionsReducer";
import {ImageUploader} from "../../../components/imageUploader/ImageUploader";
import {TransferFields} from "../../../components/transferFields/TransferFields";



type PropsType = {
    userId?: string
}

export const AddCollectionModal = ({userId}: PropsType) => {

    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()
    const showModal = () => {
        setOpen(!open)}

    const handleChange = (value: string) => {
        formik.setFieldValue("theme", value)
    };
    const handleMarkdownChange = (e: string | undefined) => {
        formik.setFieldValue("description", e)
    };

    const setImageUrl = (url: string) => {
        formik.setFieldValue("image", url)
    }
    const setItemsFields=(itemsFields:string[])=>{
        formik.setFieldValue("itemsFields", itemsFields)
    }

    const formik = useFormik({
        initialValues: {
            theme: '',
            title: '',
            description: '',
        },
        validate: validateAddCollectionForm,
        onSubmit: (values) => {
            dispatch(createCollectionTC({...values, userId}))
            formik.resetForm()
            showModal()

        },
    });

    return (
        <>
            <Button onClick={showModal} icon={<AppstoreAddOutlined/>}>add new collection</Button>
            <Modal
                centered
                open={open}
                title="New collection"
                onOk={showModal}
                onCancel={showModal}
                footer={[
                    <Form
                        className={s.formBox}
                        name="normal_login"
                        key='form'
                        onSubmitCapture={formik.handleSubmit}
                    >
                        Theme:
                        <Form.Item
                            className={s.formItemBox}
                            help={formik.touched.theme && !!formik.errors.theme ? formik.errors.theme : " "}
                            validateStatus={formik.touched.theme && !!formik.errors.theme ? "error" : "success"}
                        >

                            <Select
                                onChange={handleChange}
                                options={COLLECTIONS_THEMES.map(el => (
                                    {key: el, value: el, label: el}),
                                )}
                            />
                        </Form.Item>
                        Title:
                        <Form.Item
                            className={s.formItemBox}
                            help={formik.touched.title && !!formik.errors.title ? formik.errors.title : " "}
                            validateStatus={formik.touched.title && !!formik.errors.title ? "error" : "success"}
                        >
                            <Input {...formik.getFieldProps('title')}
                                   placeholder="title"/>
                        </Form.Item>
                        Description:
                        <Form.Item
                            help={formik.touched.description && !!formik.errors.description ? formik.errors.description : " "}
                            validateStatus={formik.touched.description && !!formik.errors.description ? "error" : "success"}
                        >
                            <MDEditor
                                value={formik.values.description}
                                onChange={handleMarkdownChange}
                                placeholder="description"
                            />
                        </Form.Item>
                        <ImageUploader setImageUrl={setImageUrl}/>
                        <Form.Item>
                            Select additional fields in collection instances:
                        <TransferFields setItemsFields={setItemsFields}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={s.loginFormButton}>
                                Add collection
                            </Button>
                        </Form.Item>
                    </Form>
                ]}
            >
            </Modal>
        </>
    );
};

