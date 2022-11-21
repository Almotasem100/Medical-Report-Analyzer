import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from '../shared/baseUrl';

import fetch from 'cross-fetch';

export const photoUpload = createAsyncThunk('redux/photoUpload',async (photos) => {
  const photoArray = []
  for (let photo in photos){
    var photoSend = {
      uri: photos[photo].img,
      type: 'image/jpeg',
      name: photos[photo].id+'.jpg',
      };
      photoArray.push(photoSend)
  }
  
    //use formdata
    var formData = new FormData(); 
    //append created photo{} to formdata
    for (let photo in photoArray){
      formData.append('fileData', photoArray[photo]);
    }
    //console.log("formData",formData);
    //console.log("photo: ",photoArray)
  const response = await fetch (baseUrl + 'image/upload', {
                              method: "POST",
                              headers: { 'Content-Type': 'multipart/form-data' },
                              body: formData,
                            })

  const res = await response.json();
  //console.log("res: ",res)
  return res;

})

export const photoDownload = createAsyncThunk('redux/photoDownload',async () => {
  const response = await fetch (baseUrl + 'image/download')
  const res = await response.json();
  //console.log("res: ",res)
  return res;

})

export const imageSlice = createSlice({
    name: 'image',
    initialState: {errMess: null,report:'',images:[],status: 'idle'},
    reducers: {
        ADD_IMAGE: (state, action) => {state.images = action.payload},
        CHANGE_MEASURE: (state,action) => {state.report.measurments[action.payload.Measurement] = action.payload.value;
          
          console.log(state.report.measurments[action.payload.Measurement] + ': '+action.payload.value);
        console.log("state.report.measurments",state.report.measurments);}
    },
    extraReducers: {
      [photoUpload.pending]: (state, action) => {
        console.log('pending Upload')
        state.status = 'loading Upload'
      },
      [photoUpload.fulfilled]: (state, action) => {
        state.status = 'succeeded Upload'
        console.log('succeeded Upload')
        state.report = action.payload
        console.log("Payload",action.payload.measurments);
      },
      [photoUpload.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed Upload')
        state.errMess = action.error.message
        console.log(action.error.message)
      },
      [photoDownload.pending]: (state, action) => {
        console.log('pending dishes')
        state.status = 'loading'
      },
      [photoDownload.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        console.log('succeeded dishes')
        state.dishes = action.payload
      },
      [photoDownload.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed photoDownload')
        state.errMess = action.error.message
      },
    }
})

export const { ADD_IMAGE,CHANGE_MEASURE} = imageSlice.actions;
export default imageSlice.reducer;

