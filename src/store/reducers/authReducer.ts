import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setAuthInProgress, setLoading, setSuccessMessage} from "./appReducer";
import {authApi, AuthDataType, UserType} from "../../api/authApi";


export const registerTC = createAsyncThunk("auth/register", async (params: AuthDataType, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await authApi.registration(params)
        dispatch(setRegistered(true))
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const loginTC = createAsyncThunk("auth/login", async (params: AuthDataType, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await authApi.login(params)
        localStorage.setItem("token", res.data.loggedUser.accessToken)
        dispatch(setIsLogin(true))
        return res.data.loggedUser

    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const logoutTC = createAsyncThunk("auth/logout", async (params, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res=await authApi.logout()
        localStorage.removeItem("token")
        dispatch(setIsLogin(false))
        dispatch(setUser(null))
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const authTC = createAsyncThunk("auth/auth", async (params, {dispatch}) => {
    dispatch(setLoading(true))
    dispatch(setAuthInProgress(true))
    try {
        const res= await authApi.auth()
        localStorage.setItem("token", res.data.loggedUser.accessToken)
        dispatch(setIsLogin(true))
        return res.data.loggedUser
    } catch (err: any) {
    } finally {
        dispatch(setLoading(false))
        dispatch(setAuthInProgress(false))
    }
})


export const slice = createSlice({
    name: "auth",
    initialState: {
        isRegistered: false,
        isLogin: false,
        isAdmin:false,
        user:null as null | UserType
    },
    reducers: {
        setRegistered(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload
        },
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
        setUser(state, action: PayloadAction<null | UserType>) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state,action)=>{
            if(action.payload) {
                state.user = action.payload
                action.payload.role==="admin"
                    ? state.isAdmin=true
                    : state.isAdmin=false
            }

        })
        builder.addCase(authTC.fulfilled, (state,action)=>{
            if(action.payload) {
                state.user = action.payload
                action.payload.role==="admin"
                    ? state.isAdmin=true
                    : state.isAdmin=false
            }
        })
    }
})

export const authReducer = slice.reducer
export const {setRegistered, setIsLogin, setUser} = slice.actions