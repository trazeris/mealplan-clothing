import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Category from "../../components/category/category.component";
import { fetchCategoriesStart } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop;