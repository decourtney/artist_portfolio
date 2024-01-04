import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface ProductState {
  data: Product | undefined;
}

export const productSlice = createSlice({
  name: "product",
  initialState: { data: undefined },
  reducers: {
    setProductState: (
      state: ProductState,
      action: PayloadAction<Product | undefined>
    ) => {
      state.data = action.payload;
    },
    unsetProductState: (state: ProductState) => {
      state.data = undefined;
    },
  },
});

export const { setProductState, unsetProductState } = productSlice.actions;

export default productSlice.reducer;
