import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import ingredients from "./ingredients";
import pantries from "./pantry";
import recipes from "./recipes";
import selectedPantry from "./selectedPantry";
import wines from "./wines";
import recipeIngredients from './recipeIngredients';

const reducer = combineReducers({
  auth,
  pantries,
  ingredients,
  recipes,
  selectedPantry,
  wines,
  recipeIngredients
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./ingredients";
export * from './pantry';
export * from "./recipes";
export * from "./selectedPantry";
export * from "./wines";
export * from './recipeIngredients';

