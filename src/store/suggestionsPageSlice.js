import { createSlice } from "@reduxjs/toolkit";

const suggestionsPageSlice = createSlice({
  name: "suggestionsPage",
  initialState: {
    suggestionsPageVisible: true,
    keyword: "All",
    showSortMenu: false,
    sortCategory: "Most Upvotes",
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

    toggleSortMenu: (state) => {
      state.showSortMenu = !state.showSortMenu;
    },

    setSortCategory: (state, action) => {
      state.sortCategory = action.payload;
      state.showSortMenu = false;
    },
  },
});

export default suggestionsPageSlice;
