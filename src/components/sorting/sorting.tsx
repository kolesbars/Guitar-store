import { updateGuitarsList } from '../../store/action';
//import { getGuitars } from '../../store/guitars-data/selectors';
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { GuitarType } from '../../types/guitar';
import {SyntheticEvent} from 'react';
import {useSearchParams} from 'react-router-dom';

type SortingProps = {
  api: AxiosInstance,
}

function Sorting({api}:SortingProps): JSX.Element {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  //const guitars = useSelector(getGuitars);

  const sortType = searchParams.get('_sort') || '';
  const orderType = searchParams.get('_order') || '';

  const [activeSortType, setActiveSortType] = useState(sortType);
  const [activeOrder, setActiveOrder] = useState(orderType);

  const [params, setParams] = useState({
    _sort: activeSortType,
    _order: activeOrder,
  });

  useEffect(() => {
    setParams({...params, _sort: activeSortType, _order: activeOrder});
  }, [activeSortType, activeOrder]);

  const handleClickSortByPrice = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setActiveSortType('price');
  };

  const handleClickSortByRating = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setActiveSortType('rating');
  };

  const handleClickSortByIncrease = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setActiveOrder('asc');
  };

  const handleClickSortByDecrease = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setActiveOrder('desc');
  };

  const sortGuitarList = async () => {
    const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams.toString()}`);
    dispatch(updateGuitarsList(data));
  };

  useEffect(() => {
    setSearchParams(params);
    sortGuitarList();
  }, [params]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button
          ${activeSortType === 'price' ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tab-index="-1"
          onClick={handleClickSortByPrice}
        >
                    по цене
        </button>
        <button
          className={`catalog-sort__type-button
          ${activeSortType === 'rating' ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={handleClickSortByRating}
        >
                    по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${activeOrder === 'asc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tab-index="-1"
          onClick={handleClickSortByIncrease}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${activeOrder === 'desc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={handleClickSortByDecrease}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
