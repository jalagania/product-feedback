import { data } from "../data";
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "appData",
  initialState: {
    appData: data,
    filteredData: data.productRequests,
  },
  reducers: {
    filterData: (state, action) => {
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

    sortData: (state, action) => {
      if (action.payload === "Most Upvotes") {
        state.filteredData = state.filteredData.sort(
          (a, b) => b.upvotes - a.upvotes
        );
      }

      if (action.payload === "Least Upvotes") {
        state.filteredData = state.filteredData.sort(
          (a, b) => a.upvotes - b.upvotes
        );
      }

      if (action.payload === "Most Comments") {
        state.filteredData = state.filteredData.sort(
          (a, b) =>
            b.comments.length +
            b.comments.reduce((sum, comment) => {
              if (comment.replies) {
                return sum + comment.replies.length;
              }
              return sum;
            }, 0) -
            (a.comments.length +
              a.comments.reduce((sum, comment) => {
                if (comment.replies) {
                  return sum + comment.replies.length;
                }
                return sum;
              }, 0))
        );
      }

      if (action.payload === "Least Comments") {
        state.filteredData = state.filteredData.sort(
          (a, b) =>
            a.comments.length +
            a.comments.reduce((sum, comment) => {
              if (comment.replies) {
                return sum + comment.replies.length;
              }
              return sum;
            }, 0) -
            (b.comments.length +
              b.comments.reduce((sum, comment) => {
                if (comment.replies) {
                  return sum + comment.replies.length;
                }
                return sum;
              }, 0))
        );
      }
    },
  },
});

export default dataSlice;
