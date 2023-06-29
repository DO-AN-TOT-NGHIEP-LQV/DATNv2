import thunk from "redux-thunk";
import reducer from "./reducers";
import { createStore } from "redux";
import { applyMiddleware } from "redux";

const middlewares = [thunk];
export default createStore(reducer, applyMiddleware(...middlewares));
