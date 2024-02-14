import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./redux/categorySlice";
import productReducer from "./redux/productSlice";
import sliderReducer from "./redux/sliderSlice";
import miniModalReducer from "./redux/miniModalSlice";
import sliderItemReducer from "./redux/sliderItemSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    slider: sliderReducer,
    miniModal: miniModalReducer,
    sliderItem: sliderItemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
