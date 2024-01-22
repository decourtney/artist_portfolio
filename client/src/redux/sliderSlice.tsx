import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface SliderState {
  lowestVisibleIndex: number;
  sliderHasMoved: boolean;
  isSliding: boolean;
  sliderState: { [sliderId: string]: { lowestVisibleIndex: number, sliderHasMoved: boolean } };
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState: { lowestVisibleIndex: 0, sliderHasMoved: false, isSliding: false, sliderState: {} },
  reducers: {
    setLowestVisibleIndex: (
      state: SliderState,
      action: PayloadAction<number>
    ) => {
      state.lowestVisibleIndex = action.payload;
    },
    setSliderHasMoved: (state: SliderState, action: PayloadAction<boolean>) => { state.sliderHasMoved = action.payload; },
    setIsSliding: (state: SliderState, action: PayloadAction<boolean>) => {
      state.isSliding = action.payload;
    },
    setSliderState: (state: SliderState, action: PayloadAction<{ sliderId: string; lowestVisibleIndex: number; sliderHasMoved: boolean }>) => {
      const { sliderId, lowestVisibleIndex, sliderHasMoved } = action.payload;
      state.sliderState[sliderId] = { lowestVisibleIndex, sliderHasMoved };
    },
  }
});

export const { setLowestVisibleIndex, setSliderHasMoved, setIsSliding, setSliderState } = sliderSlice.actions;

export default sliderSlice.reducer;
