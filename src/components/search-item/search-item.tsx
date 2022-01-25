import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import {GuitarType} from '../../types/guitar';

type SearchItemProps = {
  guitar: GuitarType,
  id: number
  currentItem: number | undefined
}

function SearchItem({guitar, id, currentItem}: SearchItemProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <li
      className={`form-search__select-item${currentItem === id ? 'form-search__select-item-focus' : ''}`}
      tab-index='0'
      data-testid='search-item'
      onClick={(evt) => {
        evt.preventDefault();
        navigate(`${AppRoute.Guitar}/${guitar.id}`);
      }}
    >
      {guitar.name}
    </li>
  );
}

export default SearchItem;
