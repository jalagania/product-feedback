import { createSlice } from "@reduxjs/toolkit";

const addFeedbackSlice = createSlice({
  name: "addFeedback",
  initialState: {
    addFeedbackPageVisible: false,
    pageBeforeAddFeedback: "",
  },
  reducers: {
    showAddFeedbackPage: (state) => {
      state.addFeedbackPageVisible = true;
    },

    hideAddFeedbackPage: (state) => {
      state.addFeedbackPageVisible = false;
    },

    setPageBeforeAddFeedback: (state, action) => {
      state.pageBeforeAddFeedback = action.payload;
    },
  },
});

export default addFeedbackSlice;
