import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect, useRef } from 'react';
import {GuitarType} from '../../types/guitar';

type SearchItemProps = {
  guitar: GuitarType,
  id: number
  currentItem: number | undefined
}

function SearchItem({guitar, id, currentItem}: SearchItemProps): JSX.Element {
  const navigate = useNavigate();

  const liItem = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (liItem.current !== null && currentItem === id) {
      liItem.current.focus();
    }
  }, [currentItem]);

  return (
    <li
      ref={liItem}
      className={`form-search__select-item ${currentItem === id ? 'form' : ''}`}
      tabIndex={0}
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
