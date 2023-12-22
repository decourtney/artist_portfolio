import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./redux/categorySlice";
import productReducer from "./redux/productSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
