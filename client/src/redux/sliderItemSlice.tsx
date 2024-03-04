import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SliderItemState {
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
      sliderItemVisibility: string;
      isSliderItemVisible: boolean;
    };
  };
}

export const sliderItemSlice = createSlice({
  name: "sliderItem",
  initialState: {
    sliderItemState: {} as {
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
        sliderItemVisibility: string;
        isSliderItemVisible: boolean;
      };
    },
  },
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
        sliderItemVisibility?: string;
        isSliderItemVisible?: boolean;
      }>
    ) => {
      const { sliderItemId, ...newState } = action.payload;
      if (sliderItemId) {
        // Update individual slider state
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
