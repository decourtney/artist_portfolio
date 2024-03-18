import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SliderItemState {
  // sliderItemState: {               // Removed to prevent sliderItemState from becoming bloated and dramatically slow down redux-persist
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
  // };
}

const initialState: SliderItemState = {
  // sliderItemState: {},
};

export const sliderItemSlice = createSlice({
  name: "sliderItem",
  initialState,
  reducers: {
    setSliderItemState: (
      state: SliderItemState,
      action: PayloadAction<{
        sliderItemId: string;
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
        state[sliderItemId] = {
          ...state[sliderItemId],
          ...newState,
        };
      }
    },
  },
});

export const { setSliderItemState } = sliderItemSlice.actions;

export default sliderItemSlice.reducer;
