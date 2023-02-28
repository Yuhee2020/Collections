import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '../../api/authApi'
import { UpdatedUserType } from '../../api/usersApi'
import { usersApi } from '../../api/usersApi/usersApi'
import { StateType } from '../../hooks'

import { setAppError, setLoading, setSuccessMessage } from './appReducer'

const mainAdminMail = process.env.REACT_APP_MAIN_ADMIN_MAIL

export const getUsersTC = createAsyncThunk('users/get', async (params, { dispatch }) => {
  dispatch(setLoading(true))
  try {
    const res = await usersApi.getUsers()

    return res.data.reverse().filter(user => user.email !== mainAdminMail)
  } catch (err: any) {
    dispatch(setAppError(err.response.data.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const deleteUsersTC = createAsyncThunk(
  'users/delete',
  async (params: string[], { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await usersApi.deleteUsers(params)

      dispatch(setSuccessMessage(res.data.message))

      return res.data.users.reverse().filter(user => user.email !== mainAdminMail)
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const updateUsersTC = createAsyncThunk(
  'users/update',
  async (params: UpdatedUserType[], { dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await usersApi.updateUsers(params)

      dispatch(setSuccessMessage(res.data.message))

      return res.data.users.reverse().filter(user => user.email !== mainAdminMail)
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const changeUsersRoleTC = createAsyncThunk(
  'users/changeUsersRole',
  async (params: string[], { dispatch, getState }) => {
    dispatch(setLoading(true))
    try {
      const state = getState() as StateType
      const { users } = state.users
      const updatedUsers = users.filter(user => params.includes(user._id))
      const updatedProperties = updatedUsers.map(user => ({
        id: user._id,
        role: user.role === 'admin' ? 'user' : 'admin',
      }))
      const res = await usersApi.updateUsers(updatedProperties)

      dispatch(setSuccessMessage(res.data.message))

      return res.data.users.reverse().filter(user => user.email !== mainAdminMail)
    } catch (err: any) {
      dispatch(setAppError(err.response.data.message))
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const slice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserType[],
    userProfile: {} as UserType,
  },
  reducers: {
    setUserProfile(state, action: PayloadAction<string>) {
      const index = state.users.findIndex(user => user._id === action.payload)

      state.userProfile = state.users[index]
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsersTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
    })
    builder.addCase(deleteUsersTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
    })
    builder.addCase(updateUsersTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
    })
    builder.addCase(changeUsersRoleTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
    })
  },
})
export const { setUserProfile } = slice.actions
export const usersReducer = slice.reducer
