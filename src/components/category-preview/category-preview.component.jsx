import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
  return (
    <CategoryPreviewContainer>
      <Title>
        <Link to={`./${title}`} className='title'>{title.toUpperCase()}</Link>
      </Title>
      <Preview>
        {
          products
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
          ))
        }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;