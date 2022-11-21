import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from '../shared/baseUrl';
import fetch from 'cross-fetch';
import { useDispatch , seSelector } from 'react-redux';


export const signin = createAsyncThunk('redux/signin',async (loginData) => {
  var res =''

  if (loginData.type == 'patient' ) {

    const response = await fetch (baseUrl + 'users/login/patient',{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
    res = await response.json();

  }else if(loginData.type == 'doctor'){
    const response = await fetch (baseUrl + 'users/login/doctor',{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
    res = await response.json();

  }else{
    res = 'error in sign in';
  }
  
  //console.log("res:  ",res);
  return res;

})

export const singup = createAsyncThunk('redux/singup',async (newUser) => {
  
  //console.log(newUser)
  var res =''
  if (newUser.type == 'patient' ) {
    const response = await fetch (baseUrl + 'users/signup/patient',{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),

    })
    res = await response.json();  
    res.type = 'patient';
  }else if(newUser.type == 'doctor'){
    const response = await fetch (baseUrl + 'users/signup/doctor',{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),

    })
    res = await response.json();
    res.type = 'doctor';
  }else{
    res = 'error in sign up';
  }
  
  //console.log(res)
  
  return res;

})

export const getReports = createAsyncThunk('redux/getReports',async () => {
  console.log("response");
  const response = await fetch (baseUrl + 'report')
  const res = await response.json();
  //console.log("response",res);
  return res;

})

export const postReports = createAsyncThunk('redux/postreports',async (report) => {

  const response = await fetch (baseUrl + 'report',{
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report),
    //credentials: "same-origin"
  })
  const res = await response.json();
return res;

})

export const deletReports = createAsyncThunk('redux/deletReports',async (reportId) => {
  //console.log("report id",reportId)
  const response = await fetch (baseUrl + 'report/'+reportId ,{
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })
  const res = await response.json();;
  return res; 

})
const dummyData = [
  {
    id:"0",
    name:"dola",
    subtitle:"dodldld"
  },
  {
    id:"1",
    name:"saddola",
    subtitle:"dodlsacscasdcadld"
  },
  {
    id:"2",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"3",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"4",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"5",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"6",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"7",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"8",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"9",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"10",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"11",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"12",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"13",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"14",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"15",
    name:"asddola",
    subtitle:"dxcvodldld"
  },
  {
    id:"16",
    name:"asddola",
    subtitle:"dxcvodldld"
  }
]
export const userSlice = createSlice({
    name: 'user',
    initialState: {errMess: null,id:'',reports:[],type:'idl',data:dummyData,firstname:'ahmed',lastname:'adel',phone:'',email:'',logedin:false,status: 'idle',speciality:'',gender:'',birthdate:''},
    reducers: {
        USER_TYPE: (state, action) => {
          state.type = action.payload
        },
        ADD_REPORTS: (state, action) => {
          state.reports = action.payload
        }
    },
    extraReducers: {
      [signin.pending]: (state, action) => {
        console.log('pending sigin in');
        state.status = 'loading';
      },
      [signin.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        // console.log('succeeded sidsgdsfasfasfgin in');
        //console.log("action.payload",action.payload);
        state.firstname=action.payload.firstname;
        state.lastname =action.payload.lastname;
        state.phone=action.payload.username;
        state.email=action.payload.email;
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.id=action.payload._id;
        state.reports = action.payload.reports;
        state.logedin = true;
        if(state.type=='patient'){
          state.speciality = action.payload.speciality;
        }
      },
      [signin.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed sigin in')
        state.errMess = action.error.message
      },
      [singup.pending]: (state, action) => {
        console.log('pending sigin up')
        state.status = 'loading'
      },
      [singup.fulfilled]: (state, action) => {
        state.status = 'succeeded sigin up'
        console.log('succeeded sigin up')
        
      },
      [singup.rejected]: (state, action) => {
        state.status = 'failed sigin up'
        console.log('failed sigin up')
        state.errMess = action.error.message
      },
      [getReports.pending]: (state, action) => {
        console.log('pending sgetReports');
        state.status = 'loading';
      },
      [getReports.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        console.log('succeeded in getReports');
        //console.log(action.payload);
        state.reports = action.payload;
      },
      [getReports.rejected]: (state, action) => {
        state.status = 'failed';
        console.log('failed getReports');
        state.errMess = action.error.message;
      },
      [postReports.pending]: (state, action) => {
        console.log('pending postReports in');
        state.status = 'loading';
      },
      [postReports.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        console.log('succeeded in postReports');
        state.reports = action.payload;

      },
      [postReports.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed postReports')
        state.errMess = action.error.message
      },
      [deletReports.pending]: (state, action) => {
        console.log('pending deletReports in');
        state.status = 'loading';
      },
      [deletReports.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        console.log('succeeded in deletReports');
        state.reports = action.payload;

      },
      [deletReports.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed deletReports')
        state.errMess = action.error.message
      },
    }
})

export const { USER_TYPE,ADD_REPORTS} = userSlice.actions;
export default userSlice.reducer;
