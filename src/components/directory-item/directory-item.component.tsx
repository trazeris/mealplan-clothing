import { useNavigate } from 'react-router-dom';
import { ShopCategory } from '../directory/directory.component';
import {
  BackgroundImage,
  DirectoryItemBody,
  DirectoryItemContainer,
} from './directory-item.styles';

type DirectoryItemProps = {
  shopCategory: ShopCategory;
};

const DirectoryItem = ({ shopCategory }: DirectoryItemProps) => {
  const { title, imageUrl, route } = shopCategory;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
