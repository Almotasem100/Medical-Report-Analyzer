import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user';
import imageSlice from './images';
import reportSlice from './reports';
import doctorSlice from './doctor'

export default configureStore({
  reducer: {
    user: userSlice,
    image: imageSlice,
    report: reportSlice,
    doctor: doctorSlice
  }
})