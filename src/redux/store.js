import { combineReducers, createStore } from "redux";
import mobilityReducer from "./reducers/mobility";

const rootReducer = combineReducers({
  data: mobilityReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
