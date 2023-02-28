import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteObject, getStorage, ref } from 'firebase/storage'

import { ItemType } from '../../api/itemsApi'
import { itemsApi } from '../../api/itemsApi/itemsApi'
import { StateType } from '../../hooks'
import { DataType } from '../../pages/collectionPage/itemsTable/ItemsTable'
import { FormikValuesType } from '../../utils/addItemFormValidation'

import { setAppError, setLoading, setSuccessMessage } from './appReducer'
import { createTagsTC } from './tagsReducer'

export const createItemTC = createAsyncThunk(
  'items/createItem',
  async (params: FormikValuesType, { dispatch }) => {
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
  },
)

export const getCollectionItemsTC = createAsyncThunk(
  'items/getCollectionItems',
  async (params: string, { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await itemsApi.getCollectionItems(params)

      return res.data.items
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const getItemTC = createAsyncThunk(
  'items/getItem',
  async (params: string, { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await itemsApi.getItem(params)

      return res.data.item
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const getItemsTC = createAsyncThunk(
  'items/getItems',
  async (params, { dispatch, getState }) => {
    try {
      const state = getState() as StateType
      const { searchText } = state.items
      const res = await itemsApi.getItems(searchText)

      return res.data.items
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setItemsAreLoading(false))
    }
  },
)

export const deleteItemsTC = createAsyncThunk(
  'items/deleteItems',
  async (params: { items: DataType[]; collectionId: string }, { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await itemsApi.deleteItems(
        params.items.map(item => item.itemId),
        params.collectionId,
      )
      const storage = getStorage()

      await params.items.forEach(item => {
        if (item.image) {
          const desertRef = ref(storage, item.image)

          deleteObject(desertRef)
        }
      })

      return res.data.items
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const editItemTC = createAsyncThunk(
  'items/editItem',
  async (params: { newItem: ItemType; oldImage: string | undefined }, { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await itemsApi.editItem(params.newItem)

      params.newItem.tags && dispatch(createTagsTC(params.newItem.tags))
      dispatch(getCollectionItemsTC(params.newItem.collectionId))
      if (params.oldImage && params.oldImage !== params.newItem.image) {
        const storage = await getStorage()
        const desertRef = await ref(storage, params.oldImage)

        await deleteObject(desertRef)
      }

      return res.data.updatedItem
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const likeItemTC = createAsyncThunk(
  'items/likeItem',
  async (params: ItemType, { dispatch, getState }) => {
    try {
      const state = getState() as StateType
      const userId = state.auth.user?._id

      if (userId && !params.usersIdWhoLiked.includes(userId)) {
        const likedItem = {
          ...params,
          likesCount: params.likesCount + 1,
          usersIdWhoLiked: [...params.usersIdWhoLiked, userId],
        }
        const res = await itemsApi.editItem(likedItem)

        return res.data.updatedItem
      }
      if (userId && params.usersIdWhoLiked?.includes(userId)) {
        const likedItem = {
          ...params,
          likesCount: params.likesCount - 1,
          usersIdWhoLiked: params.usersIdWhoLiked.filter(id => id !== userId),
        }
        const res = await itemsApi.editItem(likedItem)

        return res.data.updatedItem
      }
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    }
  },
)

export const slice = createSlice({
  name: 'items',
  initialState: {
    itemsIsLoading: false,
    searchText: '',
    collectionItems: [] as ItemType[],
    lastItems: [] as ItemType[],
    item: {} as ItemType,
  },
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.searchText = action.payload
    },
    setItemsAreLoading(state, action: PayloadAction<boolean>) {
      state.itemsIsLoading = action.payload
    },
  },
  extraReducers: builder => {
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
    builder.addCase(getItemsTC.fulfilled, (state, action) => {
      if (action.payload) state.lastItems = action.payload
    })
    builder.addCase(likeItemTC.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.lastItems.findIndex(item => item._id === action.payload?._id)

        state.lastItems[index] = action.payload
      }
    })
  },
})

export const itemsReducer = slice.reducer
export const { setSearch, setItemsAreLoading } = slice.actions
