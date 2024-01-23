import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SliderState {
  sliderState: {
    [sliderId: string]: {
      lowestVisibleIndex: number;
      sliderHasMoved: boolean;
      isSliding: boolean;
    };
  };
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliderState: {} as {
      [sliderId: string]: {
        lowestVisibleIndex: number;
        sliderHasMoved: false;
        isSliding: false;
      };
    },
  },
  reducers: {
    setSliderState: (
      state: SliderState,
      action: PayloadAction<{
        sliderId: string;
        lowestVisibleIndex?: number;
        sliderHasMoved?: boolean;
        isSliding?: boolean;
      }>
    ) => {
      const { sliderId, ...newState } = action.payload;
      state.sliderState[sliderId] = {
        ...state.sliderState[sliderId],
        ...newState,
      };
    },
  },
});

export const { setSliderState } = sliderSlice.actions;

export default sliderSlice.reducer;
