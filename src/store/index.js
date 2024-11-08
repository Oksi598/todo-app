import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers"; 

const store = configureStore({
  reducer: rootReducer, 
  devtools: true,         
});

export default store;  
