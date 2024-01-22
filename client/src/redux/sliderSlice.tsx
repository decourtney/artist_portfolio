import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface SliderState {
  lowestVisibleIndex: number;
  isSliding: boolean;
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState: { lowestVisibleIndex: 0, isSliding: false },
  reducers: {
    setLowestVisibleIndex: (
      state: SliderState,
      action: PayloadAction<number>
    ) => {
      state.lowestVisibleIndex = action.payload;
    },
    setIsSliding: (state: SliderState, action: PayloadAction<boolean>) => {
      state.isSliding = action.payload;
    },
  },
});

export const { setLowestVisibleIndex, setIsSliding } = sliderSlice.actions;

export default sliderSlice.reducer;
