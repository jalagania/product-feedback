import { configureStore } from "@reduxjs/toolkit";
import suggestionsPageSlice from "./suggestionsPageSlice";

export const store = configureStore({
  reducer: {
    suggestionsPage: suggestionsPageSlice.reducer,
  },
});
