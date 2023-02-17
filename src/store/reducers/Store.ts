import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkDispatch,} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import {usersReducer} from "./usersReducer";
import {collectionsReducer} from "./collectionsReducer";
import {itemsReducer} from "./itemsReducer";
import {tagsReducer} from "./tagsReducer";
import {commentsReducer} from "./commentsReducer";



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



export type StateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<StateType, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector