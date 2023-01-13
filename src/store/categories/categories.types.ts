export enum CategoriesActionTypes {
  fetchStart = 'categories/fetchCategoriesStart',
  fetchSuccess = 'categories/fetchCategoriesSuccess',
  fetchFailed = 'categories/fetchCategoriesFailed',
}

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: Product[];
};
