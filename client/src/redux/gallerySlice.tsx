import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface GalleryState {
  galleryState: { sliderItemRef: string | null; showMiniModal: boolean };
}

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleryState: { sliderItemRef: null, showMiniModal: false },
  },
  reducers: {
    setGalleryState: (
      state: GalleryState,
      action: PayloadAction<{
        sliderItemRef?: string;
        showMiniModal?: boolean;
      }>
    ) => {
      const { ...newState } = action.payload;
      state.galleryState = { ...state.galleryState, ...newState };
    },
  },
});

export const { setGalleryState } = gallerySlice.actions;

export default gallerySlice.reducer;
