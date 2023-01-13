import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CategoriesState } from './categories.reducer';
import { Product } from './categories.types';

const selectCategoriesSlice = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategoriesArray = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categoriesArray) =>
    categoriesArray.reduce<Record<string, Product[]>>((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.isLoading
);
