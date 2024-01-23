import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface ProductState {
  data: Product;
}

export const productSlice = createSlice({
  name: "product",
  initialState: { data: {} as Product },
  reducers: {
    setProductState: (
      state: ProductState,
      action: PayloadAction<Product>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setProductState } = productSlice.actions;

export default productSlice.reducer;
