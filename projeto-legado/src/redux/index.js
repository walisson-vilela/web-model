import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = () => {
  return applyMiddleware(thunkMiddleware)(createStore)(reducers, devTools);
};

export default store;
