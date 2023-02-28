import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { appReducer } from './reducers/appReducer'
import { authReducer } from './reducers/authReducer'
import { collectionsReducer } from './reducers/collectionsReducer'
import { commentsReducer } from './reducers/commentsReducer'
import { itemsReducer } from './reducers/itemsReducer'
import { tagsReducer } from './reducers/tagsReducer'
import { usersReducer } from './reducers/usersReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  users: usersReducer,
  collections: collectionsReducer,
  items: itemsReducer,
  tags: tagsReducer,
  comments: commentsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})
