import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    filteredData: data.productRequests,
  },
  reducers: {
    filterSuggestions: (state, action) => {
      if (action.payload[0] === "All") {
        state.filteredData = action.payload[1].productRequests;
      }

      if (action.payload[0] === "UI") {
        state.filteredData = action.payload[1].productRequests.filter(
          (request) => request.category === "ui"
        );
      }

      if (action.payload[0] === "UX") {
        state.filteredData = action.payload[1].productRequests.filter(
          (request) => request.category === "ux"
        );
      }

      if (action.payload[0] === "Enhancement") {
        state.filteredData = action.payload[1].productRequests.filter(
          (request) => request.category === "enhancement"
        );
      }

      if (action.payload[0] === "Bug") {
        state.filteredData = action.payload[1].productRequests.filter(
          (request) => request.category === "bug"
        );
      }

      if (action.payload[0] === "Feature") {
        state.filteredData = action.payload[1].productRequests.filter(
          (request) => request.category === "feature"
        );
      }
    },
  },
});

export default sidebarSlice;
