import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "@/types/category";

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    clearCategories(state) {
      state.categories = [];
    },
  },
});

export const { setCategories, clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
