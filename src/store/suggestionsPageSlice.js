import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const suggestionsPageSlice = createSlice({
  name: "suggestionsPage",
  initialState: {
    appData: data,
    filteredData: data.productRequests,
    keyword: "All",
    showSortMenu: false,
    sortCategory: "Most Upvotes",
  },
  reducers: {
    filterSuggestions: (state, action) => {
      if (action.payload === "All") {
        state.filteredData = state.appData.productRequests;
      }

      if (action.payload === "UI") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "ui"
        );
      }

      if (action.payload === "UX") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "ux"
        );
      }

      if (action.payload === "Enhancement") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "enhancement"
        );
      }

      if (action.payload === "Bug") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "bug"
        );
      }

      if (action.payload === "Feature") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "feature"
        );
      }
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

    sortSuggestions: (state) => {
      if (state.sortCategory === "Most Upvotes") {
        state.filteredData = state.filteredData.sort(
          (a, b) => b.upvotes - a.upvotes
        );
      }

      if (state.sortCategory === "Least Upvotes") {
        state.filteredData = state.filteredData.sort(
          (a, b) => a.upvotes - b.upvotes
        );
      }

      if (state.sortCategory === "Most Comments") {
        state.filteredData = state.filteredData.sort(
          (a, b) => b.comments.length - a.comments.length
        );
      }

      if (state.sortCategory === "Least Comments") {
        state.filteredData = state.filteredData.sort(
          (a, b) => a.comments.length - b.comments.length
        );
      }
    },
  },
});

export default suggestionsPageSlice;
