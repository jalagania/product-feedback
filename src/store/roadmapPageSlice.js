import { createSlice } from "@reduxjs/toolkit";

const roadmapPageSlice = createSlice({
  name: "roadmap",
  initialState: {
    roadmapPageVisible: false,
  },
  reducers: {
    showRoadmapPage: (state) => {
      state.roadmapPageVisible = true;
    },

    hideRoadmapPage: (state) => {
      state.roadmapPageVisible = false;
    },
  },
});

export default roadmapPageSlice;
