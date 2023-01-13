import { useDispatch } from 'react-redux';
import { cartAddProduct } from '../../store/cart/cart.action';
import { Product } from '../../store/categories/categories.types';
import {
  Footer,
  Name,
  Price,
  CardButton,
  ProductCardContainer,
  Image,
} from './product-card.styles';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
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
