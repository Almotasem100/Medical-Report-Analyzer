import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from '../shared/baseUrl';
import fetch from 'cross-fetch';
import { useDispatch } from 'react-redux';
import { State } from 'react-native-gesture-handler';
export const postReports = createAsyncThunk('redux/postreports',async (report) => {
    //console.log(report);
  //console.log(newReport)
    const response = await fetch (baseUrl + 'report',{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    })
    const res = await response.json();
  return res;

})

export const getReports = createAsyncThunk('redux/getReports',async (doctorReports) => {
  //console.log("response");
  const response = await fetch (baseUrl + 'report/doctorReports',{
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctorReports),
  })
  const res = await response.json();
  // console.log("get reporot responde",res);
  return res;

})

export const deletReports = createAsyncThunk('redux/deletReports',async (reportId) => {
  //console.log("report id",reportId)
  const response = await fetch (baseUrl + 'report/doctorReports/'+reportId ,{
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })
  const res = await response.json();
  //console.log("deletReports response",res);
  //console.log(res);
  return res; 

})
// state.reports.find( (report) => report. === req.params.reportId)
export const reportSlice = createSlice({
    name: 'report',
    initialState: {errMess: null,reports:[],status: 'idle'},
    reducers: {
        SEND_REPORTS: (state, action) => {state.reports.push(action.payload) },
        DELET_REPORT:(State,action) =>{ console.log("doctor Report",state.reports)}
    },
    extraReducers:  {
      [postReports.pending]: (state, action) => {
        console.log('pending postReports in');
        state.status = 'loading';
      },
      [postReports.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        console.log('succeeded in postReports');
        //console.log("res:  ",action.payload);
        // setTimeout(() => {
        //   useDispatch(ADD_REPORTS(action.payload))
        // }, 2000);
        //console.log("action.payload",action.payload);
      },
      [postReports.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed sigin in')
        state.errMess = action.error.message
      },
      [getReports.pending]: (state, action) => {
        console.log('pending sigin in');
        state.status = 'loading';
      },
      [getReports.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        console.log('succeeded in getReports');
        state.reports = action.payload;
        //console.log(state.reports);
        //console.log("action.payload",action.payload);
      },
      [getReports.rejected]: (state, action) => {
        state.status = 'failed';
        console.log('failed getReports');
        state.errMess = action.error.message;
      },
      [deletReports.pending]: (state, action) => {
        console.log('pending deletReports in');
        state.status = 'loading';
      },
      [deletReports.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        console.log('succeeded in deletReports'); 
        // for(let{ report} of state.reports){
          
        // }
        //console.log("action payload", action.payload);
        // console.log("doctor reports",state.reports);
        // console.log("delet report",  );

        state.reports = state.reports.filter(  (report) =>  report.report._id != action.payload );
        
        // console.log("report deleted",state.reports.map((report)=>{report.report.find((report) => report.reportId===action.payload)});
        
      },
      [deletReports.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed deletReports')
        state.errMess = action.error.message
      },
    }
})

export const { SEND_REPORTS,DELET_REPORT} = reportSlice.actions;
export default reportSlice.reducer;

