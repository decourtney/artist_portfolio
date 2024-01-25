import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../utils/customClientTypes";

interface GalleryState {
  galleryState: { sliderItemId: string | null; showMiniModal: boolean };
}

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleryState: { sliderItemId: null, showMiniModal: false },
  },
  reducers: {
    setGalleryState: (
      state: GalleryState,
      action: PayloadAction<{
        sliderItemId: string | null;
        showMiniModal: boolean;
      }>
    ) => {
      const { ...newState } = action.payload;
      state.galleryState = { ...state.galleryState, ...newState };
    },
  },
});

export const { setGalleryState } = gallerySlice.actions;

export default gallerySlice.reducer;
