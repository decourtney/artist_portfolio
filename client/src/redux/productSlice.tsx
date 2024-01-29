import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface ProductState {
  productState: { data: Product }
}

export const productSlice = createSlice({
  name: "product",
  initialState: { productState: { data: {} as Product } },
  reducers: {
    setProductState: (
      state: ProductState,
      action: PayloadAction<Product>
    ) => {
      const { ...newState } = action.payload;
      state.productState = { ...state.productState, ...newState };
    },
  },
});

export const { setProductState } = productSlice.actions;

export default productSlice.reducer;
