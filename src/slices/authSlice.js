import { createSlice } from '@reduxjs/toolkit'
const { ipcRenderer } = window.require('electron')

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    signInReducer: (state, action) => {
      state.token = ipcRenderer.invoke('get-cookie')
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload
    },
    signOutReducer: state => {
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.user = {}
      ipcRenderer.invoke('remove-cookie')
    },
  },
})

export const { signInReducer, signOutReducer } = authSlice.actions

export const auth = state => state.auth

export default authSlice.reducer
