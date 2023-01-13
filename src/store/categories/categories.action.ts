import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CategoriesActionTypes, Category } from './categories.types';

export type FetchCategoriesStart = Action<CategoriesActionTypes.fetchStart>;
export type FetchCategoriesSuccess = ActionWithPayload<
  CategoriesActionTypes.fetchSuccess,
  Category[]
>;
export type FetchCategoriesFailed = ActionWithPayload<
  CategoriesActionTypes.fetchFailed,
  Error
>;

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart => createAction(CategoriesActionTypes.fetchStart)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(CategoriesActionTypes.fetchSuccess, categoriesArray)
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CategoriesActionTypes.fetchFailed, error)
);
