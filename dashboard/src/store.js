import { configureStore } from '@reduxjs/toolkit'
import widgetsReducer from './slices/widgetsSlice'

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
})
