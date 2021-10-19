import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name:"locationInfo", 
    initialState: {
        latitude: null, 
        longitude: null,
    }, 
    reducers: {
        assignLatitude: (state, action)=>{
            state.latitude = action.payload;
        }, 
        assignLongitude: (state, action)=>{
            state.longitude = action.payload
        }
    }
})

export const {assignLatitude, assignLongitude} = locationSlice.actions