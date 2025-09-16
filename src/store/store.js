import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../slices/expenseSlice";

const store=configureStore({
  reducer:{
    calculation:expenseReducer
  }
})
export default store
