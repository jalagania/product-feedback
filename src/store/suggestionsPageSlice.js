import { createSlice } from "@reduxjs/toolkit";

const suggestionsPageSlice = createSlice({
  name: "suggestionsPage",
  initialState: {
    suggestionsPageVisible: true,
    keyword: "All",
  },
  reducers: {
    showSuggestionsPage: (state) => {
      state.suggestionsPageVisible = true;
    },

    hideSuggestionsPage: (state) => {
      state.suggestionsPageVisible = false;
    },

    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export default suggestionsPageSlice;
