import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface MiniModalState {
  miniModalState: {
    miniModalContainerId: string;
    modalItem: Category | Product;
    miniModalRect: {
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
    marginPosition: string | null;
  };
}

export const miniModalSlice = createSlice({
  name: "miniModal",
  initialState: {
    miniModalState: {} as {
      miniModalContainerId: string;
      modalItem: Category | Product;
      miniModalRect: {
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
      marginPosition: string | null;
    },
  },
  reducers: {
    setMiniModalState: (
      state: MiniModalState,
      action: PayloadAction<{
        miniModalContainerId?: string;
        modalItem?: Category | Product;
        miniModalRect?: {
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
        marginPosition?: string | null;
      }>
    ) => {
      const { ...newState } = action.payload;
      state.miniModalState = { ...state.miniModalState, ...newState };
    },
  },
});

export const { setMiniModalState } = miniModalSlice.actions;

export default miniModalSlice.reducer;
