import { createSlice } from "@reduxjs/toolkit";

const addFeedbackSlice = createSlice({
  name: "addFeedback",
  initialState: {
    addFeedbackPageVisible: false,
  },
  reducers: {
    showAddFeedbackPage: (state) => {
      state.addFeedbackPageVisible = true;
    },

    closeAddFeedbackPage: (state) => {
      state.addFeedbackPageVisible = false;
    },
  },
});

export default addFeedbackSlice;
