import { data } from "../data";
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "appData",
  initialState: {
    appData: data,
    filteredData: data.productRequests,
  },
  reducers: {
    syncFilteredData: (state) => {
      state.filteredData = state.appData.productRequests;
    },

    filterData: (state, action) => {
      if (action.payload === "All") {
        state.filteredData = state.appData.productRequests;
      }

      if (action.payload === "UI") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "UI"
        );
      }

      if (action.payload === "UX") {
        state.filteredData = state.appData.productRequests.filter(
          (request) => request.category === "UX"
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

    upvote: (state, action) => {
      const requestID = action.payload;
      const requestIndex = state.appData.productRequests.findIndex(
        (request) => request.id === requestID
      );
      let upvoted, upvotes;
      if (state.appData.productRequests[requestIndex].upvoted === undefined) {
        upvoted = true;
        upvotes = state.appData.productRequests[requestIndex].upvotes + 1;
      } else {
        upvoted = !state.appData.productRequests[requestIndex].upvoted;
      }

      if (upvoted === true) {
        upvotes = state.appData.productRequests[requestIndex].upvotes + 1;
      } else {
        upvotes = state.appData.productRequests[requestIndex].upvotes - 1;
      }

      state.appData = {
        ...state.appData,
        productRequests: [
          ...state.appData.productRequests.slice(0, requestIndex),
          {
            ...state.appData.productRequests[requestIndex],
            upvoted: upvoted,
            upvotes: upvotes,
          },
          ...state.appData.productRequests.slice(requestIndex + 1),
        ],
      };
    },

    addFeedback: (state, action) => {
      const newFeedback = action.payload;
      state.appData = {
        ...state.appData,
        productRequests: [...state.appData.productRequests, newFeedback],
      };
    },

    deleteFeedback: (state, action) => {
      const requestID = action.payload;
      state.appData = {
        ...state.appData,
        productRequests: state.appData.productRequests.filter(
          (request) => request.id !== requestID
        ),
      };
    },

    editFeedback: (state, action) => {
      const requestID = action.payload[0];
      const newFeedback = action.payload[1];
      const requestIndex = state.appData.productRequests.findIndex(
        (request) => request.id === requestID
      );
      state.appData = {
        ...state.appData,
        productRequests: [
          ...state.appData.productRequests.slice(0, requestIndex),
          { ...state.appData.productRequests[requestIndex], ...newFeedback },
          ...state.appData.productRequests.slice(requestIndex + 1),
        ],
      };
    },

    addComment: (state, action) => {
      const requestID = action.payload[0];
      const newComment = action.payload[1];
      const requestIndex = state.appData.productRequests.findIndex(
        (request) => request.id === requestID
      );
      state.appData = {
        ...state.appData,
        productRequests: [
          ...state.appData.productRequests.slice(0, requestIndex),
          {
            ...state.appData.productRequests[requestIndex],
            comments: [
              ...state.appData.productRequests[requestIndex].comments,
              newComment,
            ],
          },
          ...state.appData.productRequests.slice(requestIndex + 1),
        ],
      };
    },

    addReply: (state, action) => {},
  },
});

export default dataSlice;
