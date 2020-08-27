import { configureStore } from '@reduxjs/toolkit'

import kitListReducer from './slices/kitListSlice'
import isLoadingReducer from './slices/isLoadingSlice'
import authReducer from './slices/authSlice'

export default configureStore({
  reducer: {
    kitList: kitListReducer,
    isLoading: isLoadingReducer,
    auth: authReducer,
  },
})
