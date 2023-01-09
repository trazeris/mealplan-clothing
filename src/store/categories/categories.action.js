export const fetchCategoriesStart = 
  () => 
    ({type: 'categories/fetchCategoriesStart'});

export const fetchCategoriesSuccess = 
  (categoriesArray) => 
    ({type: 'categories/fetchCategoriesSuccess', payload: categoriesArray});

export const fetchCategoriesFailed = 
  (error) => 
    ({type: 'categories/fetchCategoriesFailed', payload: error});