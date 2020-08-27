import { createSlice } from '@reduxjs/toolkit'
const { ipcRenderer } = window.require('electron')
const Store = window.require('electron-store')
const store = new Store()

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: store.get('jwtToken'),
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    signInReducer: (state, action) => {
      state.token = store.get('jwtToken')
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload
    },
    signOutReducer: state => {
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.user = {}
      ipcRenderer.invoke('sign-out')
    },
  },
})

export const { signInReducer, signOutReducer } = authSlice.actions

export const auth = state => state.auth

export default authSlice.reducer
