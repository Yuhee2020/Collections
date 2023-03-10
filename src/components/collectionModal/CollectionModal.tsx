import React, { useEffect, useState } from 'react'

import { AppstoreAddOutlined, EditOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { Button, Form, Input, Modal, Select } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { CollectionType } from '../../api/collectionsApi'
import { COLLECTIONS_THEMES } from '../../constants'
import { useAppDispatch } from '../../hooks'
import {
  createCollectionTC,
  editCollectionTC,
} from '../../store/reducers/collectionsReducer'
import { validateAddCollectionForm } from '../../utils/addCollectionFormValidation'
import { ImageUploader } from '../imageUploader/ImageUploader'
import { TransferFields } from '../transferFields/TransferFields'

import s from './CollectionModal.module.scss'

type PropsType = {
  userId?: string
  edit?: boolean
  collection?: CollectionType
}

export const CollectionModal = ({ userId, edit, collection }: PropsType) => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const showModal = () => {
    setOpen(!open)
  }

  const handleChange = (value: string) => {
    formik.setFieldValue('theme', value)
  }
  const handleMarkdownChange = (e: string | undefined) => {
    formik.setFieldValue('description', e)
  }

  const setImageUrl = (url: string) => {
    formik.setFieldValue('image', url)
  }
  const setItemsFields = (itemsFields: string[]) => {
    formik.setFieldValue('itemsFields', itemsFields)
  }

  const formik = useFormik({
    initialValues: {
      theme: '',
      title: '',
      description: '',
    },
    validate: validateAddCollectionForm,
    onSubmit: values => {
      if (edit) {
        dispatch(
          editCollectionTC({
            collection: { ...collection, ...values, userId },
            oldImage: collection?.image,
          }),
        )
      } else {
        dispatch(createCollectionTC({ ...values, userId }))
      }
      formik.resetForm()
      showModal()
    },
  })

  useEffect(() => {
    if (edit && collection) formik.setValues(collection)
  }, [])

  return (
    <>
      {edit ? (
        <Button type="text" onClick={showModal} icon={<EditOutlined />}>
          {t('edit')}
        </Button>
      ) : (
        <Button onClick={showModal} icon={<AppstoreAddOutlined />}>
          {t('addNewCollection')}
        </Button>
      )}
      <Modal
        centered
        open={open}
        title={edit ? t('editCollection') : t('newCollection')}
        onOk={showModal}
        onCancel={showModal}
        footer={[
          <Form
            className={s.formBox}
            name="normal_login"
            key="form"
            onSubmitCapture={formik.handleSubmit}
          >
            {t('theme')}:
            <Form.Item
              className={s.formItemBox}
              help={
                formik.touched.theme && !!formik.errors.theme ? formik.errors.theme : ' '
              }
              validateStatus={
                formik.touched.theme && !!formik.errors.theme ? 'error' : 'success'
              }
            >
              <Select
                onChange={handleChange}
                value={formik.values.theme}
                options={COLLECTIONS_THEMES.map(el => ({
                  key: el,
                  value: el,
                  label: el,
                }))}
              />
            </Form.Item>
            {t('title')}:
            <Form.Item
              className={s.formItemBox}
              help={
                formik.touched.title && !!formik.errors.title ? formik.errors.title : ' '
              }
              validateStatus={
                formik.touched.title && !!formik.errors.title ? 'error' : 'success'
              }
            >
              <Input {...formik.getFieldProps('title')} placeholder="title" />
            </Form.Item>
            {t('descriptions')}:
            <Form.Item
              help={
                formik.touched.description && !!formik.errors.description
                  ? formik.errors.description
                  : ' '
              }
              validateStatus={
                formik.touched.description && !!formik.errors.description
                  ? 'error'
                  : 'success'
              }
            >
              <MDEditor
                value={formik.values.description}
                onChange={handleMarkdownChange}
                placeholder="description"
              />
            </Form.Item>
            <ImageUploader setImageUrl={setImageUrl} id={formik.values.title} />
            <Form.Item className={s.transfer}>
              {t('selectFields')}
              <TransferFields
                itemsFields={collection?.itemsFields}
                setItemsFields={setItemsFields}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {edit ? t('editCollection') : t('createCollection')}
              </Button>
            </Form.Item>
          </Form>,
        ]}
      />
    </>
  )
}
