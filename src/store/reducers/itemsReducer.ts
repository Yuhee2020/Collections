import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {itemsApi, ItemType} from "../../api/itemsApi";
import {createTagsTC} from "./tagsReducer";
import {DataType} from "../../pages/collectionPage/itemsTable/ItemsTable";
import {deleteObject, getStorage, ref} from "firebase/storage";


export const createItemTC = createAsyncThunk("items/createItem",
    async (params: ItemType, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.createItem(params)
            params.tags && dispatch(createTagsTC(params.tags))
            dispatch(setSuccessMessage(res.data.message))
            return res.data.items
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getCollectionItemsTC = createAsyncThunk("items/getCollectionItems",
    async (params:string, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.getCollectionItems(params)
            return res.data.items
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getItemTC = createAsyncThunk("items/getItem",
    async (params:string, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.getItem(params)
            return res.data.item
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getLastItemsTC = createAsyncThunk("items/getLastItems",
    async (params, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.getLastItems()
            return res.data.items
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const deleteItemsTC = createAsyncThunk("items/deleteItems",
        async (params:{ items: DataType[], collectionId: string }, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.deleteItems(params.items.map(item=>item.itemId),params.collectionId)
            const storage = getStorage();
            await params.items.forEach((item)=>{
                if(item.image) {
                    const desertRef = ref(storage, item.image);
                    deleteObject(desertRef)
                }
            })
            return res.data.items
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const editItemTC = createAsyncThunk("items/editItem",
    async (params: { newItem:ItemType, oldImage:string | undefined }, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.editItem(params.newItem)
            dispatch(getCollectionItemsTC(params.newItem.collectionId))
            if(params.oldImage && params.oldImage !== params.newItem.image){
                const storage = getStorage();
                const desertRef = ref(storage, params.oldImage);
                await deleteObject(desertRef)
            }
            return res.data.updatedItem
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const slice = createSlice({
    name: "items",
    initialState: {
        searchText:'',
        collectionItems:[] as ItemType[],
        lastItems:[] as ItemType[],
        item:{} as ItemType,
    },
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.searchText=action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCollectionItemsTC.fulfilled, (state, action) => {
            if (action.payload) state.collectionItems = action.payload
        })
        builder.addCase(createItemTC.fulfilled, (state, action) => {
            if (action.payload) state.collectionItems = action.payload
        })
        builder.addCase(getItemTC.fulfilled, (state, action) => {
            if (action.payload) state.item = action.payload
        })
        builder.addCase(deleteItemsTC.fulfilled, (state, action) => {
            if (action.payload) state.collectionItems = action.payload
        })
        builder.addCase(editItemTC.fulfilled, (state, action) => {
            if (action.payload) state.item = action.payload
        })
        builder.addCase(getLastItemsTC.fulfilled, (state, action) => {
            if (action.payload) state.lastItems = action.payload
        })

    }
})

export const itemsReducer = slice.reducer
export const {} = slice.actions