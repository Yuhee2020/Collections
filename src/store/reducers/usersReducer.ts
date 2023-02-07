import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {UserType} from "../../api/authApi";
import {usersApi} from "../../api/usersApi";


const mainAdminMail=process.env.REACT_APP_MAIN_ADMIN_MAIL


export const getUsersTC = createAsyncThunk("users/get", async (params, {dispatch}) => {
    console.log(mainAdminMail)
    dispatch(setLoading(true))
    try {
        const res = await usersApi.getUsers()
        return res.data.reverse().filter(user=>user.email!==mainAdminMail)
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const deleteUsersTC = createAsyncThunk("users/delete", async (params:string[], {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await usersApi.deleteUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const blockUsersTC = createAsyncThunk("users/block", async (params:string[], {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await usersApi.blockUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const unlockUsersTC = createAsyncThunk("users/unlock", async (params:string[], {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await usersApi.unlockUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const changeUsersRoleTC = createAsyncThunk("users/changeUsersRole", async (params:string[], {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await usersApi.changeUsersRole(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
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
               if(action.payload) {
                   state.users = action.payload
               }
        })
    }
})

export const usersReducer = slice.reducer