import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface GalleryState {
  galleryState: { sliderItemRef: HTMLDivElement; showMiniModal: boolean };
}

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleryState: {} as { sliderItemRef: null; showMiniModal: false },
  },
  reducers: {
    setGalleryState: (
      state: GalleryState,
      action: PayloadAction<{
        sliderItemRef?: HTMLDivElement;
        showMiniModal?: boolean;
      }>
    ) => {
      const { ...newState } = action.payload;
      state.galleryState = { ...newState };
    },
  },
});

export const { setGalleryState } = gallerySlice.actions;

export default gallerySlice.reducer;
