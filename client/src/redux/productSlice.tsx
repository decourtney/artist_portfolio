import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: { data: undefined },
  reducers: {
    setProductState: (state, action) => {
      state.data = action.payload;
    },
    unsetProductState: (state) => {
      state.data = undefined;
    },
  },
});

export const { setProductState, unsetProductState } = productSlice.actions;

export default productSlice.reducer;
