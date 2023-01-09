import { createSelector } from "reselect";

const selectCategoriesSlice = (state) => state.categories;

export const selectCategoriesArray = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categoriesArray) => categoriesArray.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.isLoading
)