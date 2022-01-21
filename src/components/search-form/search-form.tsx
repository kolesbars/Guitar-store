import SearchItem from './search-item';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {GuitarType} from '../../types/guitar';
import {ChangeEvent, SyntheticEvent} from 'react';
import { updateSearchFormParams } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchFormParams} from '../../store/search-params/selectors';
import { getSimilarGuitars } from '../../store/guitars-data/selectors';
import { loadSimilarGuitars } from '../../store/api-actions';
import {AxiosInstance} from 'axios';

type SearchFormProps = {
  api: AxiosInstance,
  guitars: GuitarType[],
}

function SearchForm({guitars, api}: SearchFormProps): JSX.Element {
  const dispatch = useDispatch();

  const searchFormParams = useSelector(getSearchFormParams);
  const similarGuitars = useSelector(getSimilarGuitars);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get('name_like') || '';

  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSubmitSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({
      'name_like': searchValue,
    });
  };

  useEffect(() => {
    dispatch(updateSearchFormParams(Object.assign(
      {},
      searchFormParams,
      {
        'name_like': searchText,
      },
    )));
  }, []);

  useEffect(() => {
    dispatch(loadSimilarGuitars(searchValue));
  }, [searchValue]);

  return (
    <div className="form-search">
      <form
        className="form-search__form"
        onSubmit={handleSubmitSearch}
      >
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
          data-testid='search-input'
          autoComplete="off"
          placeholder="что вы ищете?"
          onChange={handleChangeSearchForm}
        />
        <label className="visually-hidden" htmlFor="search">
                  Поиск
        </label>
      </form>
      <ul className={`form-search__select-list ${searchValue === '' ? 'hidden' : ''}`}>
        {similarGuitars &&
        similarGuitars.map((guitar) =>
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
