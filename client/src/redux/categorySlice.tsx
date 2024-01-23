import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface CategoryState {
  data: Category;
}

export const categorySlice = createSlice({
  name: "category",
  initialState: { data: {} as Category },
  reducers: {
    setCategoryState: (
      state: CategoryState,
      action: PayloadAction<Category>
    ) => {
      state.data = action.payload;
    },

  },
});

export const { setCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
