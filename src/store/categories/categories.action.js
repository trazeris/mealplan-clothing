import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = 
  () => 
    ({type: 'categories/fetchCategoriesStart'});

export const fetchCategoriesSuccess = 
  (categoriesArray) => 
    ({type: 'categories/fetchCategoriesSuccess', payload: categoriesArray});

export const fetchCategoriesFailed = 
  (error) => 
    ({type: 'categories/fetchCategoriesFailed', payload: error});

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch(error) {
    dispatch(fetchCategoriesFailed(error));
  }
}