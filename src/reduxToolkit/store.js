import { configureStore } from "@reduxjs/toolkit";
import { materialsSlice } from "./materialsSlice";

export default configureStore({
    reducer: {
        materialsInfo: materialsSlice.reducer,
    },
});