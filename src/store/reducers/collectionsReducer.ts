import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {collectionsApi, CollectionType} from "../../api/collectionsApi";
import {deleteObject, getStorage, ref} from "firebase/storage";
import {StateType} from "./Store";


export const createCollectionTC = createAsyncThunk("collection/createCollection",
    async (params: CollectionType, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await collectionsApi.createCollection(params)
            dispatch(setSuccessMessage(res.data.message))
            return res.data.collections.reverse()
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getCollectionsTC = createAsyncThunk("collections/getUserCollections",
    async (params: string | undefined, {dispatch}) => {
        dispatch(setCollectionsAreLoading(true))
        try {
            const res =await collectionsApi.getCollections(params)
           if ( params) {
               return res.data.collections.reverse()
           }
           // @ts-ignore
            return res.data.collections.sort((a,b)=>b.itemsCount-a.itemsCount)
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setCollectionsAreLoading(false))
        }
    })

export const deleteCollectionTC = createAsyncThunk("collections/deleteCollection",
    async (params: { collectionId: string, userId: string }, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await collectionsApi.deleteCollection(params.collectionId)
            const storage = getStorage();
            if (res.data.deletedCollection.image) {
                const desertRef = ref(storage, res.data.deletedCollection.image);
                await deleteObject(desertRef)
            }
            dispatch(getCollectionsTC(params.userId))
            dispatch(setCollection({}))
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const editCollectionTC = createAsyncThunk("collections/editCollection",
    async (params: { collection: CollectionType, oldImage?: string }, {dispatch, getState}) => {
        dispatch(setLoading(true))
        try {
            const state = getState() as StateType
            const collections = state.collections.collections

            if (params.oldImage && params.oldImage !== params.collection.image) {
                const storage = getStorage();
                const desertRef = ref(storage, params.oldImage);
                await deleteObject(desertRef)
            }
            const res = await collectionsApi.editUserCollections(params.collection)
            dispatch(setCollection(res.data.updatedCollection))
            dispatch(setCollections(collections.map(coll=>coll._id===params.collection._id?
                {...coll,...res.data.updatedCollection} :coll)))
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
        collectionsAreLoading:false,
        collectionImageUrl: "",
        collections: [] as CollectionType[],
        collection: {} as CollectionType
    },
    reducers: {
        setCollection(state, action: PayloadAction<CollectionType>) {
            state.collection = action.payload
        },
        setCollections(state, action: PayloadAction<CollectionType[]>) {
            state.collections = action.payload
        },
        setCollectionsAreLoading(state, action: PayloadAction<boolean>) {
            state.collectionsAreLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCollectionsTC.fulfilled, (state, action) => {
            if (action.payload) state.collections = action.payload
        })
        builder.addCase(getCollectionTC.fulfilled, (state, action) => {
            if (action.payload) state.collection = action.payload
        })
        builder.addCase(createCollectionTC.fulfilled, (state, action) => {
            if (action.payload) state.collections = action.payload
        })
    }
})

export const collectionsReducer = slice.reducer
export const {setCollection, setCollections,setCollectionsAreLoading} = slice.actions