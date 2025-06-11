import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from '@/features/auth/authAPI';
import { categoryAPI } from '@/features/category/categoryAPI'; 
import authReducer from '@/features/auth/authSlice';
import categoryReducer from '@/features/category/categorySlice';
import { expensesAPI } from '@/features/expense/expenseAPI';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer, 
    [expensesAPI.reducerPath]: expensesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(categoryAPI.middleware).concat(expensesAPI.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
