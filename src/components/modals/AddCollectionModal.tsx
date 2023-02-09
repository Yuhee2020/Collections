import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select, Upload, UploadFile} from "antd";
import {AppstoreAddOutlined, InboxOutlined} from "@ant-design/icons";
import {useFormik} from "formik";
import s from "./AddcollectionModal.module.css"
import MDEditor from "@uiw/react-md-editor";
import Dragger from "antd/es/upload/Dragger";
import {UploadChangeParam} from "antd/es/upload";
import {RcFile} from "antd/es/upload/interface";
import {collectionsApi} from "../../api/collectionsApi";
import {useAppSelector} from "../../store/reducers/Store";


export const AddCollectionModal = () => {
const userId=useAppSelector(state => state.auth.user?._id)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>()
    const [image, setImage] = useState()
    const {Dragger} = Upload;

    // const props: UploadProps = {
    //     name: 'file',
    //     multiple: false,
    //     action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange(info) {
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e) {
    //         console.log('Dropped files', e.dataTransfer.files);
    //     },
    // };

    const showModal = () => {
        setOpen(true)
    };
    const handleOk = () => {
        setOpen(false)
    };
    const handleCancel = () => {
        setOpen(false)
    };

    const handleChange = (value: string) => {
        formik.values.theme = value
    };
    const handleMarkdownChange = (e: string | undefined) => {
        setValue(e)
        e && (formik.values.description = e)
    };

    type FormikValuesType = {
        theme?: string
        title?: string
        description?: string
        image?: FormData
    }
    const validate = (values: FormikValuesType) => {
        const errors: FormikValuesType = {};
        if (!values.theme) {
            errors.theme = 'Required';
        }
        if (!values.title) {
            errors.title = 'Required';
        }
        if (!values.description) {
            errors.description = 'Required';
        }
        return errors;
    };

    const handleUploadFile = (request: any) => {

    }

    const handleDraggerChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const formData = new FormData();
        info.file.status = 'success'
        console.log(info.file.originFileObj)
        formData.append('file', info.file.originFileObj as RcFile)
        formik.values.image=formData

    }


    const formik = useFormik({
        initialValues: {
            theme: '',
            title: '',
            description: '',
        },
        validate,
        onSubmit: (values) => {
            collectionsApi.createCollection({...values,userId})
            formik.resetForm()
            handleOk()
            setValue('')
            console.log(values)
        },
    });

    return (
        <>
            <Button onClick={showModal} icon={<AppstoreAddOutlined/>}>add new collection</Button>
            <Modal
                centered
                open={open}
                title="New collection"
                onOk={handleOk}
                onCancel={handleCancel}
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
                                options={[
                                    {value: 'jack', label: 'Jack'},
                                    {value: 'lucy', label: 'Lucy'},
                                    {value: 'Yiminghe', label: 'yiminghe'},

                                ]}
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
                                value={value}
                                onChange={handleMarkdownChange}
                                placeholder="description"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Dragger
                                maxCount={1}
                                accept="image/*"
                                onChange={handleDraggerChange}
                                multiple={false}
                                customRequest={handleUploadFile}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Dragger>
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

