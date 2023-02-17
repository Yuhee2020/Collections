import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError} from "./appReducer";
import {StateType} from "./Store";
import {commentsApi, CommentType} from "../../api/commentsApi";


export const addCommentTC = createAsyncThunk("comments/addComment",
    async (params: { text: string, itemId: string }, {dispatch, getState}) => {
        try {
            const state = getState() as StateType
            if (state.auth.user) {
                const {_id, email} = state.auth.user
                const res = await commentsApi.addComment({
                    text: params.text,
                    itemId: params.itemId,
                    userName: email,
                    userId: _id
                })
                return res.data.comments.reverse()
            }
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        }
    })

export const getCommentsTC = createAsyncThunk("comments/getComments",
    async (params:string, {dispatch}) => {
        try {
            const res = await commentsApi.getComments(params)
            return res.data.comments.reverse()
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        }
    })

export const slice = createSlice({
    name: "comments",
    initialState: {
        comments: [] as CommentType[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCommentTC.fulfilled, (state, action) => {
            if (action.payload) state.comments = action.payload
        })
        builder.addCase(getCommentsTC.fulfilled, (state, action) => {
            if (action.payload) state.comments = action.payload
        })
    }
})

export const commentsReducer = slice.reducer
export const {} = slice.actions