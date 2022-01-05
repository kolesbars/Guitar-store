import SearchItem from './search-item';
import { useState, useEffect } from 'react';
import { emptyGuitar } from '../../const';
import {GuitarType} from '../../types/guitar';

type SearchFormProps = {
guitars: GuitarType[]
}

function SearchForm({guitars}: SearchFormProps): JSX.Element {

  const [searchValue, setSearchValue] = useState('');
  const [similarGuitars, setSimilarGuitars] = useState([emptyGuitar]);

  useEffect(() => {
    setSimilarGuitars(guitars.filter((guitar) => guitar.name.toLowerCase().includes(searchValue)));
  }, [searchValue]);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg
            className="form-search__icon"
            width="14"
            height="15"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={(evt) => {
            evt.preventDefault();
            setSearchValue(evt.target.value);
          }}
        />
        <label className="visually-hidden" htmlFor="search">
                  Поиск
        </label>
      </form>
      <ul className={`form-search__select-list ${searchValue === '' ? 'hidden' : ''}`}>
        {similarGuitars.map((guitar) =>
          (
            <SearchItem
              key={guitar.id}
              guitar={guitar}
            />))}
      </ul>
    </div>
  );
}

export default SearchForm;
