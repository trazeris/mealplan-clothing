import { all, takeLatest, call, put } from 'redux-saga/effects';

import { fetchCategoriesFailed, fetchCategoriesSuccess } from './categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    console.log(error);
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest('categories/fetchCategoriesStart', fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
