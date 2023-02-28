import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/authReducer";
import {appReducer} from "./reducers/appReducer";
import {usersReducer} from "./reducers/usersReducer";
import {collectionsReducer} from "./reducers/collectionsReducer";
import {itemsReducer} from "./reducers/itemsReducer";
import {tagsReducer} from "./reducers/tagsReducer";
import {commentsReducer} from "./reducers/commentsReducer";


export const rootReducer = combineReducers({
    auth:authReducer,
    app:appReducer,
    users:usersReducer,
    collections:collectionsReducer,
    items:itemsReducer,
    tags:tagsReducer,
    comments:commentsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)})



