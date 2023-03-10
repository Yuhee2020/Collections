import React, { ChangeEvent, useState } from 'react'

import { CommentOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'

import { COMMENT_AREA_ROWS, MAX_COMMENT_LENGTH } from '../../../constants'
import { useAppDispatch } from '../../../hooks'
import { addCommentTC } from '../../../store/reducers/commentsReducer'

import s from './CommentsCreator.module.scss'

type PropType = {
  itemId?: string
}

export const CommentsCreator = ({ itemId }: PropType) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
  }
  const handleSendClick = () => {
    text.trim() && itemId && dispatch(addCommentTC({ text, itemId }))
    setText('')
  }

  return (
    <div className={s.commentsContainer}>
      <Card
        title={
          <div>
            <CommentOutlined /> {t('addComment')}
          </div>
        }
        className={s.addCommentCard}
      >
        <TextArea
          className={s.textArea}
          onChange={handleTextareaChange}
          // @ts-ignore
          placeholder={t('addComment')}
          allowClear
          showCount
          value={text}
          rows={COMMENT_AREA_ROWS}
          maxLength={MAX_COMMENT_LENGTH}
        />
        <Button disabled={!text} onClick={handleSendClick}>
          {t('send')}
        </Button>
      </Card>
    </div>
  )
}
