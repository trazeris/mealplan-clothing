import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Footer, Name, Price, CardButton, ProductCardContainer, Image } from './product-card.styles';

const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product;
  const {addItemToCart} = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <CardButton onClick={addProductToCart}>Add to cart</CardButton>
    </ProductCardContainer>
  );
}

export default ProductCard;