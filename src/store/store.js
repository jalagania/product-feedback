import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import suggestionsPageSlice from "./suggestionsPageSlice";
import suggestionDetailsSlice from "./suggestionDetailsSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    suggestionsPage: suggestionsPageSlice.reducer,
    suggestionDetails: suggestionDetailsSlice.reducer,
  },
});
