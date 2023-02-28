import React, { useState } from 'react'

import { Transfer } from 'antd'

import { ITEMS_FIELDS } from '../../constants'

interface RecordType {
  key: string
  title: string
  description: string
}

type PropsType = {
  setItemsFields: (itemsFields: string[]) => void
  itemsFields?: string[]
}

export const TransferFields = ({ setItemsFields, itemsFields }: PropsType) => {
  const mockData: RecordType[] = ITEMS_FIELDS.map(el => ({
    key: el,
    title: el,
    description: el,
  }))

  const [targetKeys, setTargetKeys] = useState<string[]>(itemsFields || [])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const onChange = (nextTargetKeys: string[]) => {
    setItemsFields(nextTargetKeys)
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  return (
    <Transfer
      style={{ justifyContent: 'space-between' }}
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={item => item.title}
    />
  )
}
