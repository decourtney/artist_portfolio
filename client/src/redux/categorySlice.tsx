import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { data: undefined },
  reducers: {
    setCategoryState: (state, action) => {
      state.data = action.payload;
    },
    unsetCategoryState: (state) => {
      state.data = undefined;
    },
  },
});

export const { setCategoryState, unsetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
