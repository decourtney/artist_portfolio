import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface ProductState {
  productState: {
    productContainerId: string;
    product: Product;
    productRect: {
      height: number;
      width: number;
      x: number;
      y: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    showProductModal: boolean;
  };
}

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productState: {} as {
      productContainerId: string;
      product: Product;
      productRect: {
        height: number;
        width: number;
        x: number;
        y: number;
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      showProductModal: boolean;
    },
  },
  reducers: {
    setProductState: (
      state: ProductState,
      action: PayloadAction<{
        productContainerId?: string;
        product?: Product;
        productRect?: {
          height: number;
          width: number;
          x: number;
          y: number;
          top: number;
          bottom: number;
          left: number;
          right: number;
        };
        showProductModal?: boolean;
      }>
    ) => {
      const { ...newState } = action.payload;
      state.productState = { ...state.productState, ...newState };
    },
  },
});

export const { setProductState } = productSlice.actions;

export default productSlice.reducer;
