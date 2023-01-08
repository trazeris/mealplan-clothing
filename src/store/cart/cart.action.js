export const cartToggle = 
  () => 
    ({type: 'cart/toggle'});

export const cartAddProduct = 
  (product) => 
    ({type: 'cart/addProduct', payload: product});

export const cartDecreaseProductQuantity = 
  (product) => 
    ({type: 'cart/decreaseProductQuantity', payload: product});

export const cartDeleteProduct = 
  (product) => 
    ({type: 'cart/deleteProduct', payload: product});
  