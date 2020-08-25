import { createSlice } from '@reduxjs/toolkit'

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: { isLoading: false },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsLoading } = isLoadingSlice.actions
export const kitList = state => state.kitList
export default isLoadingSlice.reducer
