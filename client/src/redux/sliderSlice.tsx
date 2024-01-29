import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SliderState {
  sliderState: {
    [sliderId: string]: {
      lowestVisibleIndex: number;
      sliderHasMoved: boolean;
    };
  };
  globalSettings: {
    isSliding?: boolean;
  };
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliderState: {} as {
      [sliderId: string]: {
        lowestVisibleIndex: number;
        sliderHasMoved: false;
      };
    },
    globalSettings: {
      isSliding: false,
    },
  },
  reducers: {
    setSliderState: (
      state: SliderState,
      action: PayloadAction<{
        sliderId?: string;
        lowestVisibleIndex?: number;
        sliderHasMoved?: boolean;
        globalSettings?: { isSliding?: boolean };
      }>
    ) => {
      const { sliderId, ...newState } = action.payload;
      if (sliderId) {
        // Update individual slider state
        state.sliderState[sliderId] = {
          ...state.sliderState[sliderId],
          ...newState,
        };
      } else {
        // Update global settings
        state.globalSettings = {
          ...state.globalSettings,
          ...newState.globalSettings,
        };
      }
    },
  },
});

export const { setSliderState } = sliderSlice.actions;

export default sliderSlice.reducer;
