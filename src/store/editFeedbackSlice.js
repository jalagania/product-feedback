import { createSlice } from "@reduxjs/toolkit";

const editFeedbackSlice = createSlice({
  name: "editFeedback",
  initialState: {
    editFeedbackPageVisible: false,
  },
  reducers: {
    showEditFeedbackPage: (state) => {
      state.editFeedbackPageVisible = true;
    },

    hideEditFeedbackPage: (state) => {
      state.editFeedbackPageVisible = false;
    },
  },
});

export default editFeedbackSlice;
