const initialState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'categories/fetchCategoriesStart': 
      return {
        ...state,
        isLoading: true
      }
    case 'categories/fetchCategoriesSuccess': 
      return {
        ...state,
        categories: payload,
        isLoading: false
      }
    case 'categories/fetchCategoriesFailed': 
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    default:
      return state;
  }
}  