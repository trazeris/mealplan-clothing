import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Category from "../../components/category/category.component";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('here')
    // dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop;