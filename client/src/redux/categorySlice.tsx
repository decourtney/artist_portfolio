import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface CategoryState {
  categoryState: { data: Category; showCategoryModal: boolean };
}

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryState: {} as { data: Category; showCategoryModal: boolean },
  },
  reducers: {
    setCategoryState: (
      state: CategoryState,
      action: PayloadAction<{ data?: Category; showCategoryModal?: boolean }>
    ) => {
      const { ...newState } = action.payload;
      state.categoryState = { ...state.categoryState, ...newState };
    },
  },
});

export const { setCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
