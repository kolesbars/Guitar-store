import { updateSortParams } from '../../store/action';
import { updatePageCount } from '../../store/action';
import { useEffect } from 'react';
import {SyntheticEvent} from 'react';
import { useNavigate } from 'react-router';
import { AppRoute } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterParams, getSortParams} from '../../store/search-params/selectors';
import { useSearchParams } from 'react-router-dom';

function Sorting(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortParams = useSelector(getSortParams);
  const filterParams = useSelector(getFilterParams);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get('_sort') || 'price';
  const orderType = searchParams.get('_order') || '';


  const handleClickSortField = (e: SyntheticEvent<EventTarget>, value: string) => {
    e.preventDefault();
    dispatch(updateSortParams({...sortParams, '_sort': value}));
  };

  const handleClickOrderField = (e: SyntheticEvent<EventTarget>, value: string) => {
    e.preventDefault();
    dispatch(updateSortParams({...sortParams, '_order': value}));
  };

  useEffect(() => {
    dispatch(updateSortParams(Object.assign(
      {},
      sortParams,
      {
        '_order': orderType,
        '_sort': sortType,
      },
    )));
  }, []);

  useEffect(() => {
    setSearchParams({...sortParams, ...filterParams});
    dispatch(updatePageCount('1'));
    navigate(`${AppRoute.Catalog}/1`);
  }, [sortParams]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button
          ${sortType === 'price' ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tab-index="-1"
          onClick={(evt) => handleClickSortField(evt, 'price')}
        >
                    по цене
        </button>
        <button
          className={`catalog-sort__type-button
          ${sortType === 'rating' ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={(evt) => handleClickSortField(evt, 'rating')}
        >
                    по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${orderType === 'asc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tab-index="-1"
          onClick={(evt) => handleClickOrderField(evt, 'asc')}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${orderType === 'desc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={(evt) => handleClickOrderField(evt, 'desc')}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
