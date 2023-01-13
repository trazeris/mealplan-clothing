import { useDispatch } from 'react-redux';
import { cartAddProduct } from '../../store/cart/cart.action';
import {
  Footer,
  Name,
  Price,
  CardButton,
  ProductCardContainer,
  Image,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(cartAddProduct(product));

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
};

export default ProductCard;
