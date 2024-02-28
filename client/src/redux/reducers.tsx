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
import { RESET_STORE } from "./resetStore";
import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session"; // In case necessary later
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import sliderReducer from "./sliderSlice";
import miniModalReducer from "./miniModalSlice";
import sliderItemReducer from "./sliderItemSlice";

const reducers = combineReducers({
  category: categoryReducer,
  product: productReducer,
  slider: sliderReducer,
  miniModal: miniModalReducer,
  sliderItem: sliderItemReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootPersistedReducer = persistReducer(persistConfig, reducers);

const rootReducerWithReset = (state:any, action:any) => {
  if (action.type === RESET_STORE) {
    state = undefined; // Reset the state to its initial value
  }
  return rootPersistedReducer(state, action);
};

export default rootReducerWithReset;