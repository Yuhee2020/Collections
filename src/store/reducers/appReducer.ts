import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const setThemeTC = createAsyncThunk("app/setTheme", (params: ThemeType, {dispatch}) => {
    localStorage.setItem("theme", params)
    dispatch(setTheme(params))
})


export const slice = createSlice({
    name: "app",
    initialState: {
        theme: "light" as ThemeType,
        isLoading: false,
        authInProgress: false,
        isRegistered:false,
        error: null as null | string,
        successMessage: null as null | string,
    },
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setAppError(state, action: PayloadAction<null | string>) {
            state.error = action.payload
        },
        setSuccessMessage(state, action: PayloadAction<null | string>) {
            state.successMessage = action.payload
        },
        setAuthInProgress(state, action: PayloadAction<boolean>) {
            state.authInProgress = action.payload
        },
        setTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload
        },
        setIsRegistered(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload
        }
    }
})

export const appReducer = slice.reducer
export const {setLoading, setAppError, setSuccessMessage, setAuthInProgress, setTheme,setIsRegistered} = slice.actions

export type ThemeType = "light" | "dark"
