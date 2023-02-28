import React from 'react'

import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

import { ROOT } from '../rotes/Rotes'

export const Error404 = () => {
  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate(ROOT)
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleButtonClick}>
          Back Home
        </Button>
      }
    />
  )
}
