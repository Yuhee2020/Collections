import React, { useEffect } from 'react'

import MDEditor from '@uiw/react-md-editor'
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { CollectionType } from '../../../api/collectionsApi'
import { ItemType } from '../../../api/itemsApi'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { createItemTC, editItemTC } from '../../../store/reducers/itemsReducer'
import { getTagsTC } from '../../../store/reducers/tagsReducer'
import { validateAddItemForm } from '../../../utils/addItemFormValidation'
import { ImageUploader } from '../../imageUploader/ImageUploader'
import s from '../ItemModal.module.scss'

type PropsType = {
  showModal: () => void
  collection: CollectionType
  item?: ItemType
  edit?: boolean
}

export const ItemForm = ({ showModal, collection, edit, item }: PropsType) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const tags = useAppSelector(state => state.tags.tags)
  const { _id, userId, itemsFields, title } = collection

  const handleDescriptionChange = (e: string | undefined) => {
    formik.setFieldValue('description', e)
  }
  const handleHistoryChange = (e: string | undefined) => {
    formik.setFieldValue('historyOfCreation', e)
  }
  const handleCharacteristicsChange = (e: string | undefined) => {
    formik.setFieldValue('uniqueCharacteristics', e)
  }
  const handleDateChange = (e: Dayjs | null, title: string) => {
    e && formik.setFieldValue(title, e)
  }
  const setImageUrl = (url: string) => {
    formik.setFieldValue('image', url)
  }

  const options = tags.map(tag => ({ value: tag.title, label: tag.title }))

  const handleTagsChange = (value: string) => {
    console.log(value)
    formik.setFieldValue('tags', value)
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      tags: [],
      author: '',
      producer: '',
      countryOfOrigin: '',
      description: '',
    },
    validate: validateAddItemForm,
    onSubmit: values => {
      if (edit) {
        if (item)
          dispatch(editItemTC({ newItem: { ...item, ...values }, oldImage: item.image }))
      } else if (_id && userId) {
        dispatch(
          createItemTC({ ...values, collectionId: _id, userId, collectionName: title }),
        )
      }
      formik.resetForm()
      showModal()
    },
  })

  useEffect(() => {
    dispatch(getTagsTC())
    if (edit && item) formik.setValues(item)
  }, [])

  return (
    <Form
      className={s.formBox}
      name="normal_login"
      key="form"
      onSubmitCapture={formik.handleSubmit}
    >
      {t('title')}:
      <Form.Item
        className={s.formItemBox}
        help={formik.touched.title && !!formik.errors.title ? formik.errors.title : ' '}
        validateStatus={
          formik.touched.title && !!formik.errors.title ? 'error' : 'success'
        }
      >
        <Input {...formik.getFieldProps('title')} placeholder="title" />
      </Form.Item>
      {t('tags')}:
      <Form.Item>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          // @ts-ignore
          value={formik.values.tags}
          onChange={handleTagsChange}
          tokenSeparators={[',']}
          options={options}
        />
      </Form.Item>
      {itemsFields?.includes('author') && (
        <Form.Item className={s.formItemBox}>
          {t('author')}:
          <Input {...formik.getFieldProps('author')} placeholder="author" />
        </Form.Item>
      )}
      {itemsFields?.includes('producer') && (
        <Form.Item className={s.formItemBox}>
          {t('producer')}:
          <Input {...formik.getFieldProps('producer')} placeholder="producer" />
        </Form.Item>
      )}
      {itemsFields?.includes('country of origin') && (
        <Form.Item className={s.formItemBox}>
          {t('countryOfOrigin')}:
          <Input
            {...formik.getFieldProps('countryOfOrigin')}
            placeholder="country of origin"
          />
        </Form.Item>
      )}
      <div className={s.numberItemsBox}>
        {itemsFields?.includes('price') && (
          <Form.Item>
            <InputNumber
              value={formik.values.price}
              onChange={e => formik.setFieldValue('price', e)}
              addonBefore={t('price')}
              addonAfter="$"
            />
          </Form.Item>
        )}

        {itemsFields?.includes('weight') && (
          <Form.Item>
            <InputNumber
              value={formik.values.weight}
              onChange={e => formik.setFieldValue('weight', e)}
              addonBefore={t('weight')}
              addonAfter="Kg"
            />
          </Form.Item>
        )}

        {itemsFields?.includes('number of copies') && (
          <Form.Item>
            <InputNumber
              value={formik.values.numberOfCopies}
              onChange={e => formik.setFieldValue('numberOfCopies', e)}
              addonBefore={t('numberOfCopies')}
            />
          </Form.Item>
        )}
      </div>
      <Form.Item>
        {itemsFields?.includes('is unique item') && (
          <Checkbox
            checked={formik.values.isUniqueItem}
            onChange={e => formik.setFieldValue('isUniqueItem', e.target.checked)}
          >
            {t('uniqueItem')}
          </Checkbox>
        )}
        {itemsFields?.includes('is available for sale') && (
          <Checkbox
            checked={formik.values.isAvailableForSale}
            onChange={e => formik.setFieldValue('isAvailableForSale', e.target.checked)}
          >
            {t('availableForSale')}
          </Checkbox>
        )}
        {itemsFields?.includes('is available for exchange') && (
          <Checkbox
            checked={formik.values.isAvailableForExchange}
            onChange={e =>
              formik.setFieldValue('isAvailableForExchange', e.target.checked)
            }
          >
            {t('availableForExchange')}
          </Checkbox>
        )}
      </Form.Item>
      {itemsFields?.includes('production date') && (
        <Form.Item label={t('productionDate')}>
          <DatePicker
            value={dayjs(formik.values.productionDate)}
            onChange={e => handleDateChange(e, 'productionDate')}
          />
        </Form.Item>
      )}
      {itemsFields?.includes('date of writing') && (
        <Form.Item label={t('dateOfWriting')}>
          <DatePicker
            value={dayjs(formik.values.dateOfWriting)}
            onChange={e => handleDateChange(e, 'dateOfWriting')}
          />
        </Form.Item>
      )}
      {itemsFields?.includes('date of creation') && (
        <Form.Item label={t('dateOfCreation')}>
          <DatePicker
            value={dayjs(formik.values.dateOfCreation)}
            onChange={e => handleDateChange(e, 'dateOfCreation')}
          />
        </Form.Item>
      )}
      {itemsFields?.includes('description') && (
        <Form.Item>
          {t('descriptions')}:
          <MDEditor
            value={formik.values.description}
            onChange={handleDescriptionChange}
          />
        </Form.Item>
      )}
      {itemsFields?.includes('history of creation') && (
        <Form.Item>
          {t('historyOfCreation')}:
          <MDEditor
            value={formik.values.historyOfCreation}
            onChange={handleHistoryChange}
          />
        </Form.Item>
      )}
      {itemsFields?.includes('unique characteristics') && (
        <Form.Item>
          {t('uniqueCharacteristics')}:
          <MDEditor
            value={formik.values.uniqueCharacteristics}
            onChange={handleCharacteristicsChange}
          />
        </Form.Item>
      )}
      <ImageUploader setImageUrl={setImageUrl} id={formik.values._id} />
      <Form.Item>
        <Button type="primary" htmlType="submit" className={s.loginFormButton}>
          {edit ? t('editItem') : t('addItem')}
        </Button>
      </Form.Item>
    </Form>
  )
}
