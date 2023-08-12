import { combineReducers, createStore } from "redux";

import { billsReducer } from "../features/slices/billSlice";
import { userReducer } from "../features/slices/userSlice";
const rootReducer = combineReducers({
  bills: billsReducer,
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// console.log(store.getState())
