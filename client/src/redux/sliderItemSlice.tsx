import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SliderItemState {
  sliderItemState: {
    [sliderItemId: string]: {
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
      sliderItemVisibility: "visible" | "hidden";
    };
  };
}

const initialState: SliderItemState = {
  sliderItemState: {},
};

export const sliderItemSlice = createSlice({
  name: "sliderItem",
  initialState,
  reducers: {
    setSliderItemState: (
      state: SliderItemState,
      action: PayloadAction<{
        sliderItemId?: string;
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
        sliderItemVisibility?: "visible" | "hidden";
      }>
    ) => {
      const { sliderItemId, ...newState } = action.payload;
      if (sliderItemId) {
        state.sliderItemState[sliderItemId] = {
          ...state.sliderItemState[sliderItemId],
          ...newState,
        };
      }
    },
  },
});

export const { setSliderItemState } = sliderItemSlice.actions;

export default sliderItemSlice.reducer;
