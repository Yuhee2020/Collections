import React from 'react'

import { Button, Select, Switch } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { LOGIN } from '../../pages/rotes/Rotes'
import { LanguageType, setLanguageTC, setThemeTC } from '../../store/reducers/appReducer'
import { logoutTC } from '../../store/reducers/authReducer'
import { AppSearch } from '../appSearch/AppSearch'
import { BreadCrumbs } from '../breadCrumbs/BreadCrumbs'
import { HeaderMenu } from '../headerMenu/HeaderMenu'

import s from './AppHeader.module.scss'
import { Moon } from './icons/Moon'
import { Sun } from './icons/Sun'

export const AppHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })
  const isLoggedIn = useAppSelector(state => state.auth.isLogin)

  const theme = useAppSelector(state => state.app.theme)

  const handleSwitchChange = (e: boolean) => {
    dispatch(setThemeTC(e ? 'dark' : 'light'))
  }
  const handleLoginClick = () => {
    navigate(LOGIN)
  }
  const handleLogoutClick = () => {
    dispatch(logoutTC())
  }
  const handleLangSelect = (e: string) => {
    const lang = e as LanguageType

    dispatch(setLanguageTC(lang))
  }

  return (
    <div className={s.headerContainer}>
      {isBigScreen ? <BreadCrumbs /> : <HeaderMenu />}
      {isBigScreen && (
        <div className={s.search}>
          <AppSearch />
        </div>
      )}
      <div className={s.buttonsGroup}>
        <Switch
          onChange={handleSwitchChange}
          checked={theme === 'dark'}
          checkedChildren={<Sun />}
          unCheckedChildren={<Moon />}
          defaultChecked
        />
        <Select
          className={s.select}
          defaultValue="eng"
          onSelect={handleLangSelect}
          options={[
            { value: 'eng', label: 'Eng' },
            { value: 'ru', label: 'Ру' },
          ]}
        />
        {isLoggedIn ? (
          <Button onClick={handleLogoutClick}>Logout</Button>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
      </div>
    </div>
  )
}
