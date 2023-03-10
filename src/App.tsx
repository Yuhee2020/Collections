import React, { useEffect } from 'react'

import './App.scss'
import { Spin } from 'antd'
import { useMediaQuery } from 'react-responsive'

import { AppHeader } from './components/appHeader/AppHeader'
import { AppMessagesBar } from './components/appMessagesBar/AppMessagesBar'
import { AppSearch } from './components/appSearch/AppSearch'
import { ThemeProvider } from './components/themeProvider/ThemeProvider'
import { useAppDispatch, useAppSelector } from './hooks'
import Routing from './pages/rotes/Rotes'
import { getLanguageTC, getThemeTC } from './store/reducers/appReducer'
import { authTC } from './store/reducers/authReducer'

const App = () => {
  const dispatch = useAppDispatch()
  const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })
  const isLoading = useAppSelector(state => state.app.isLoading)

  useEffect(() => {
    dispatch(getThemeTC())
    dispatch(getLanguageTC())
    localStorage.getItem('token') && dispatch(authTC())
  }, [])

  return (
    <ThemeProvider>
      <AppHeader />
      <Spin wrapperClassName="spin" spinning={isLoading} size="large">
        {!isBigScreen && (
          <div className="search">
            <AppSearch />
          </div>
        )}
        <div className="rotes">
          <Routing />
        </div>
        <AppMessagesBar />
      </Spin>
    </ThemeProvider>
  )
}

export default App
