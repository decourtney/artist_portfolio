import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
// // import storageSession from "redux-persist/lib/storage/session"; // In case necessary later
// import categoryReducer from "./categorySlice";
// import productReducer from "./productSlice";
// import sliderReducer from "./sliderSlice";
// import miniModalReducer from "./miniModalSlice";
// import sliderItemReducer from "./sliderItemSlice";



// const reducers = combineReducers({
//   category: categoryReducer,
//   product: productReducer,
//   slider: sliderReducer,
//   miniModal: miniModalReducer,
//   sliderItem: sliderItemReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootPersistedReducer = persistReducer(persistConfig, reducers);
import rootReducerWithReset from "./reducers";

export const store = configureStore({
  reducer: rootReducerWithReset,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
