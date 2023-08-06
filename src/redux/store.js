import { configureStore } from "@reduxjs/toolkit";
import catalogSlice from "./slices/catalogSlice"
import currentCategorySlice from "./slices/currentCategorySlice"
import searchSlice from "./slices/searchSlice"
import fieldsSlice from "./slices/fieldsSlice"

export const store = configureStore({
    reducer: {
      catalogSlice,
      currentCategorySlice,
      searchSlice,
      fieldsSlice
    },
  })