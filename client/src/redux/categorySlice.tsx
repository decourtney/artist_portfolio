import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { category: undefined },
  reducers: {
    setCategoryState: (state, action) => {
      state.category = action.payload;
    },
    unsetCategoryState: (state) => {
      state.category = undefined;
    },
  },
});

export const { setCategoryState, unsetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
