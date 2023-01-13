import { all, takeLatest, call, put } from 'typed-redux-saga/macro';

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categories));
  } catch (error) {
    console.log(error);
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest('categories/fetchCategoriesStart', fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
