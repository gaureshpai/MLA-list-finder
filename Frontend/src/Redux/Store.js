import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './Slices/LocationSlice'
export default configureStore({
  reducer: {
    location: locationReducer,
  },
})