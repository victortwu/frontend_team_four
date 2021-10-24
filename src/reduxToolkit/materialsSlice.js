import { createSlice } from "@reduxjs/toolkit";

export const materialsSlice = createSlice({
    name:"materialsInfo", 
    initialState: {
        upc: null, 
        materials: []
    }, 
    reducers: {
        assignUPC: (state, action)=>{
            state.upc = action.payload;
        }, 
        assignMaterials: (state, action)=>{
            state.materials = action.payload
        }
    }
})

export const {assignUPC, assignMaterials} = materialsSlice.actions