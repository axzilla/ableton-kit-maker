import { configureStore } from '@reduxjs/toolkit'
import kitListReducer from './slices/kitListSlice'

export default configureStore({
  reducer: {
    kitList: kitListReducer,
  },
})
