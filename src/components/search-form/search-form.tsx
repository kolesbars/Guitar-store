import SearchItem from '../search-item/search-item';
import { useSearchParams } from 'react-router-dom';
import {GuitarType} from '../../types/guitar';
import {useNavigate} from 'react-router-dom';
import { updateSearchFormParams } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchFormParams} from '../../store/search-params/selectors';
import { getSimilarGuitars } from '../../store/guitars-data/selectors';
import { loadSimilarGuitars } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { KeyCode, CURRENT_SEARCH_ITEM_COUNT } from '../../const';
import {
  useRef,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent} from 'react';

type SearchFormProps = {
  guitars: GuitarType[],
}

function SearchForm({guitars}: SearchFormProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchFormRef = useRef<HTMLFormElement | null>(null);

  const searchFormParams = useSelector(getSearchFormParams);
  const similarGuitars = useSelector(getSimilarGuitars);

  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('name_like') || '';

  const [searchValue, setSearchValue] = useState('');
  const [isShow, setIsShow] = useState(false);

  const [itemsId, setItemsId] = useState(similarGuitars?.map((guitar) => guitar.id).sort((a,b) => a - b ));
  const [currentItem, setCurrentItem] = useState<number | undefined>(CURRENT_SEARCH_ITEM_COUNT);

  const handleChangeSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    setIsShow(true);
  };

  const handleSubmitSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (currentItem !== undefined) {
      if(e.keyCode === KeyCode.Enter && searchValue !== '' && currentItem !== CURRENT_SEARCH_ITEM_COUNT) {
        navigate(`${AppRoute.Guitar}/${currentItem}`);
      } else if (e.keyCode === KeyCode.ArrowUp || (e.keyCode === KeyCode.Tab && e.shiftKey)) {
        setCurrentItem(itemsId[itemsId.indexOf(currentItem)-1]);
      }
      else if (e.keyCode === KeyCode.ArrowDown || e.keyCode === KeyCode.Tab) {
        setCurrentItem(itemsId[itemsId.indexOf(currentItem)+1]);
      }
    } else if (e.keyCode === KeyCode.ArrowDown || e.keyCode === KeyCode.Tab) {
      setCurrentItem(itemsId[0]);
    }
  };

  const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCode.ArrowUp) {
      setCurrentItem(itemsId[0]);
    }
  };

  const handleDocumentClick = () => {
    setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
  }, []);

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
        ref={searchFormRef}
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
          onKeyDown={handleKeyDownInput}
        />
        <label className="visually-hidden" htmlFor="search">
                  Поиск
        </label>
      </form>
      <ul
        className={`form-search__select-list ${!isShow ? 'hidden' : ''}`}
        onKeyDown={handleKeyDown}
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
