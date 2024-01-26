import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface MiniModalState {
  miniModalState: {
    sliderItem: Category | Product;
    sliderItemRect: {
      bottom: number;
      height: number;
      left: number;
      right: number;
      top: number;
      width: number;
      x: number;
      y: number;
    };
    showMiniModal: boolean;
  };
}

export const miniModalSlice = createSlice({
  name: "miniModal",
  initialState: {
    miniModalState: {} as {
      sliderItem: Category | Product;
      sliderItemRect: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
      };
      showMiniModal: false;
    },
  },
  reducers: {
    setMiniModalState: (
      state: MiniModalState,
      action: PayloadAction<{
        sliderItem?: Category | Product
        sliderItemRect?: {
          bottom: number;
          height: number;
          left: number;
          right: number;
          top: number;
          width: number;
          x: number;
          y: number;
        };
        showMiniModal: boolean;
      }>
    ) => {
      const { ...newState } = action.payload;
      state.miniModalState = { ...state.miniModalState, ...newState };
    },
  },
});

export const { setMiniModalState } = miniModalSlice.actions;

export default miniModalSlice.reducer;
