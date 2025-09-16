import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    income: 0,
    expenses: {},
    balance: 0,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses = action.payload;
    },
    addIncome: (state, action) => {
      state.income = action.payload;
      state.expenses.amount = '';
    },
    addBalance: (state, action) => {
      state.balance = action.payload;
    },
    deleteExpense: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, addIncome, addBalance, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
