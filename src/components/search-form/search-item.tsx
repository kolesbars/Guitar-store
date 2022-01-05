import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import {GuitarType} from '../../types/guitar';

type SearchItemProps = {
  guitar: GuitarType,
}

function SearchItem({guitar}: SearchItemProps): JSX.Element {
  const history = useHistory();

  return (
    <li
      className="form-search__select-item"
      tab-index="0"
      onClick={(evt) => {
        evt.preventDefault();
        history.push(`${AppRoute.Guitar}/${guitar.id}`);
      }}
    >
      {guitar.name}
    </li>
  );
}

export default SearchItem;
