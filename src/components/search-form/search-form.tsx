import SearchItem from './search-item';
import { useSearchParams } from 'react-router-dom';
import {GuitarType} from '../../types/guitar';
import {useNavigate} from 'react-router-dom';
import { updateSearchFormParams } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchFormParams} from '../../store/search-params/selectors';
import { getSimilarGuitars } from '../../store/guitars-data/selectors';
import { loadSimilarGuitars } from '../../store/api-actions';
import { AppRoute } from '../../const';
import {AxiosInstance} from 'axios';
import {
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent} from 'react';

const ARROW_UP_KEY_CODE = 40;
const ARROW_DOWN_KEY_CODE = 38;
const ENTER_KEY_CODE = 13;

type SearchFormProps = {
  api: AxiosInstance,
  guitars: GuitarType[],
}

function SearchForm({guitars, api}: SearchFormProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchFormParams = useSelector(getSearchFormParams);
  const similarGuitars = useSelector(getSimilarGuitars);

  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('name_like') || '';

  const [searchValue, setSearchValue] = useState('');

  const [itemsId, setItemsId] = useState(similarGuitars?.map((guitar) => guitar.id).sort((a,b) => a - b ));
  const [currentItem, setCurrentItem] = useState<number | undefined>(0);

  const handleChangeSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSubmitSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (currentItem !== undefined) {
      if(e.keyCode === ENTER_KEY_CODE && searchValue !== '' && currentItem !== 0) {
        navigate(`${AppRoute.Guitar}/${currentItem}`);
      } else if (e.keyCode === ARROW_DOWN_KEY_CODE) {
        setCurrentItem(itemsId[itemsId.indexOf(currentItem)-1]);
      }
      else if (e.keyCode === ARROW_UP_KEY_CODE) {
        setCurrentItem(itemsId[itemsId.indexOf(currentItem)+1]);
      }
    } else if (e.keyCode === ARROW_UP_KEY_CODE) {
      setCurrentItem(itemsId[0]);
    }
  };

  useEffect(() => {
    if(similarGuitars) {
      setItemsId(similarGuitars.map((guitar) => guitar.id).sort((a,b) => a - b ));
    }
  }, [similarGuitars]);

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
          onKeyDown={handleKeyDown}
        />
        <label className="visually-hidden" htmlFor="search">
                  Поиск
        </label>
      </form>
      <ul
        className={`form-search__select-list ${searchValue === '' ? 'hidden' : ''}`}
        tab-index='0'
      >
        {similarGuitars &&
        [...similarGuitars].sort((first, second) => first.id - second.id).map((guitar) => (
          <SearchItem
            key={guitar.id}
            currentItem={currentItem}
            id={guitar.id}
            guitar={guitar}
          />))}
      </ul>
    </div>
  );
}

export default SearchForm;
