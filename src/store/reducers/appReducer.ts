import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import i18n from "../../i18n";


export const setThemeTC = createAsyncThunk("app/setTheme", (params: ThemeType, {dispatch}) => {
    localStorage.setItem("theme", params)
    dispatch(setTheme(params))
})

export const getThemeTC = createAsyncThunk("app/getTheme", (params, {dispatch}) => {
    const theme = localStorage.getItem("theme") as ThemeType
    theme && dispatch(setTheme(theme))
})

export const getLanguageTC = createAsyncThunk("app/getLanguage", async (params, {dispatch}) => {
    const language = localStorage.getItem("language") as LanguageType
    language && dispatch(setLanguage(language))
    await i18n.changeLanguage(language)
})

export const setLanguageTC = createAsyncThunk("app/setLanguage", async (params:LanguageType, {dispatch}) => {
    localStorage.setItem("language", params)
    console.log(params)
    await i18n.changeLanguage(params)
    dispatch(setLanguage(params))
})


export const slice = createSlice({
    name: "app",
    initialState: {
        language: "eng" as LanguageType,
        theme: "light" as ThemeType,
        isLoading: false,
        authInProgress: false,
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
        setLanguage(state, action: PayloadAction<LanguageType>) {
            state.language = action.payload
        },
    }
})

export const appReducer = slice.reducer
export const {
    setLoading,
    setAppError,
    setSuccessMessage,
    setAuthInProgress,
    setTheme,
    setLanguage
} = slice.actions

export type ThemeType = "light" | "dark"
export type LanguageType = "eng" | "ru"
