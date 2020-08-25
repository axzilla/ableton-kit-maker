import { configureStore } from '@reduxjs/toolkit'
import kitListReducer from './slices/kitListSlice'
import isLoadingReducer from './slices/isLoadingSlice'

export default configureStore({
  reducer: {
    kitList: kitListReducer,
    isLoading: isLoadingReducer,
  },
})
