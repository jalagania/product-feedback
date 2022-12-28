import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    appData: data,
  },
});

export default dataSlice;
