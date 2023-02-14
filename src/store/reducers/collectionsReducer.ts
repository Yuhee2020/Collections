import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {collectionsApi, CollectionType} from "../../api/collectionsApi";
import {deleteObject, getStorage, ref} from "firebase/storage";


export const createCollectionTC = createAsyncThunk("collection/createCollection",
    async (params: CollectionType, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await collectionsApi.createCollection(params)
            params.userId && dispatch(getUserCollectionsTC(params.userId))
            dispatch(setSuccessMessage(res.data.message))
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getUserCollectionsTC = createAsyncThunk("collections/getUserCollections",
    async (params: string, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await collectionsApi.getUserCollections(params)
            return res.data.userCollections
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const deleteUserCollectionTC = createAsyncThunk("collections/deleteCollection",
    async (params: { collectionId: string, userId: string }, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await collectionsApi.deleteCollection(params.collectionId)
            const storage = getStorage();
            const desertRef = ref(storage, res.data.deletedCollection.image);
            await deleteObject(desertRef)
            dispatch(getUserCollectionsTC(params.userId))
            dispatch(setCollection({}))
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const editCollectionTC = createAsyncThunk("collections/editCollection",
    async (params: { collection:CollectionType, oldImage?:string }, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            if(params.oldImage && params.oldImage !== params.collection.image){
                const storage = getStorage();
                const desertRef = ref(storage, params.oldImage);
                await deleteObject(desertRef)
            }
            const res = await collectionsApi.editUserCollections(params.collection)
            dispatch(setCollection(res.data.updatedCollection))
            params.collection.userId && dispatch(getUserCollectionsTC(params.collection.userId))
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getCollectionTC = createAsyncThunk("collections/getCollection",
    async (params: string, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await collectionsApi.getCollection(params)
            return res.data
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const slice = createSlice({
    name: "collections",
    initialState: {
        collectionImageUrl: "",
        userCollections: [] as CollectionType[],
        collection:{} as CollectionType
    },
    reducers: {
        setCollectionImageUrl(state, action: PayloadAction<string>) {
            state.collectionImageUrl = action.payload
        },
        setCollection(state, action: PayloadAction<CollectionType>) {
            state.collection = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserCollectionsTC.fulfilled, (state, action) => {
            if (action.payload) state.userCollections = action.payload
        })
        builder.addCase(getCollectionTC.fulfilled, (state, action) => {
            if (action.payload) state.collection = action.payload
        })
    }
})

export const collectionsReducer = slice.reducer
export const {setCollection} = slice.actions