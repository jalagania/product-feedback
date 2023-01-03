import { createSlice } from "@reduxjs/toolkit";

const suggestionDetailsSlice = createSlice({
  name: "suggestionDetails",
  initialState: {
    suggestionID: "",
    suggestionDetailsPageVisible: false,
    pageBeforeSuggestionDetails: "",
  },
  reducers: {
    showSuggestionDetailsPage: (state) => {
      state.suggestionDetailsPageVisible = true;
    },

    hideSuggestionDetailsPage: (state) => {
      state.suggestionDetailsPageVisible = false;
    },

    getSuggestionDetailsID: (state, action) => {
      state.suggestionID = action.payload;
    },

    setPageBeforeSuggestionDetails: (state, action) => {
      state.pageBeforeSuggestionDetails = action.payload;
    },
  },
});

export default suggestionDetailsSlice;
