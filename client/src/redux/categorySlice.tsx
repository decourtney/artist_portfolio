import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface CategoryState {
  data: Category | undefined;
}

export const categorySlice = createSlice({
  name: "category",
  initialState: { data: undefined },
  reducers: {
    setCategoryState: (
      state: CategoryState,
      action: PayloadAction<Category | undefined>
    ) => {
      state.data = action.payload;
    },
    unsetCategoryState: (state: CategoryState) => {
      state.data = undefined;
    },
  },
});

export const { setCategoryState, unsetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
