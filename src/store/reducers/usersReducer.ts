import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {StateType} from "./Store";
import {logoutTC} from "./authReducer";
import {authApi, UserType} from "../../api/authApi";
import {usersApi} from "../../api/usersApi";


export const getUsersTC = createAsyncThunk("users/get", async (params, {dispatch,rejectWithValue}) => {
    dispatch(setLoading(true))
    try {
        const res = await usersApi.getUsers()
        return res.data.reverse()
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})

export const deleteUsersTC = createAsyncThunk("users/delete", async (params:any, {dispatch,rejectWithValue, getState}) => {
    dispatch(setLoading(true))
    try {
        const state= getState() as StateType
        const userId= state.auth.user?._id
        const res = await usersApi.deleteUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
        if (params.find((id: string | undefined)=>id===userId)){
            dispatch(logoutTC())
        }
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})

export const blockUsersTC = createAsyncThunk("users/block", async (params:any, {dispatch,rejectWithValue,getState}) => {
    dispatch(setLoading(true))
    try {
        const state= getState() as StateType
        const userId= state.auth.user?._id
        const res = await usersApi.blockUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
        if (params.find((id: string | undefined)=>id===userId)){
            dispatch(logoutTC())
        }
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})

export const unlockUsersTC = createAsyncThunk("users/unlock", async (params:any, {dispatch,rejectWithValue}) => {
    dispatch(setLoading(true))
    try {
        const res = await usersApi.unlockUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})


export const slice = createSlice({
    name: "users",
    initialState: {
        users:[] as UserType[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUsersTC.fulfilled,(state, action)=>{
               state.users = action.payload
        })
    }
})

export const usersReducer = slice.reducer
