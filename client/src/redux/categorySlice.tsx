import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface CategoryState {
  categoryState: { data: Category; sliderIsClickable: boolean };
}

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryState: {} as { data: Category; sliderIsClickable: true },
  },
  reducers: {
    setCategoryState: (
      state: CategoryState,
      action: PayloadAction<{ data?: Category; sliderIsClickable?: boolean }>
    ) => {
      const { ...newState } = action.payload;
      state.categoryState = { ...state.categoryState, ...newState };
    },
  },
});

export const { setCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
