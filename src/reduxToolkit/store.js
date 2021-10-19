import { configureStore } from "@reduxjs/toolkit";
import { locationSlice } from "./locationSlice";
import { materialsSlice } from "./materialsSlice";

export default configureStore({
    reducer: {
        materialsInfo: materialsSlice.reducer,
        locationInfo: locationSlice.reducer
    },
});