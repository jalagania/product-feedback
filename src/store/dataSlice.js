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
      } else {
        upvoted = !state.appData.productRequests[requestIndex].upvoted;
      }

      if (upvoted === true) {
        upvotes = state.appData.productRequests[requestIndex].upvotes + 1;
      } else {
        upvotes = state.appData.productRequests[requestIndex].upvotes - 1;
      }

      state.appData.productRequests[requestIndex].upvoted = upvoted;
      state.appData.productRequests[requestIndex].upvotes = upvotes;
    },

    addFeedback: (state, action) => {
      const newFeedback = action.payload;

      state.appData.productRequests.push(newFeedback);
    },

    deleteFeedback: (state, action) => {
      const requestID = action.payload;

      state.appData.productRequests = state.appData.productRequests.filter(
        (request) => request.id !== requestID
      );
    },

    editFeedback: (state, action) => {
      const requestID = action.payload[0];
      const newFeedback = action.payload[1];
      const requestIndex = state.appData.productRequests.findIndex(
        (request) => request.id === requestID
      );

      state.appData.productRequests[requestIndex] = {
        ...state.appData.productRequests[requestIndex],
        ...newFeedback,
      };
    },

    addComment: (state, action) => {
      const requestID = action.payload[0];
      const newComment = action.payload[1];
      const requestIndex = state.appData.productRequests.findIndex(
        (request) => request.id === requestID
      );

      state.appData.productRequests[requestIndex].comments.push(newComment);
    },

    addReply: (state, action) => {
      const requestID = action.payload[0];
      const commentID = action.payload[1];
      const newReply = action.payload[2];
      const requestIndex = state.appData.productRequests.findIndex(
        (request) => request.id === requestID
      );
      const commentIndex = state.appData.productRequests[
        requestIndex
      ].comments.findIndex((comment) => comment.id === commentID);
      const replies =
        state.appData.productRequests[requestIndex].comments[commentIndex]
          .replies === undefined
          ? [newReply]
          : [
              ...state.appData.productRequests[requestIndex].comments[
                commentIndex
              ].replies,
              newReply,
            ];

      state.appData.productRequests[requestIndex].comments[
        commentIndex
      ].replies = replies;
    },
  },
});

export default dataSlice;
