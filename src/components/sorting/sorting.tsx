import { updateGuitarsList } from '../../store/action';
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

  const sortType = searchParams.get('_sort') || 'price';
  const orderType = searchParams.get('_order') || '';


  const [sort, setSort] = useState({
    '_sort': sortType,
    '_order': orderType,
  });

  const handleClickSortField = (e: SyntheticEvent<EventTarget>, value: string) => {
    e.preventDefault();
    setSort({...sort, '_sort': value});
  };

  const handleClickOrderField = (e: SyntheticEvent<EventTarget>, value: string) => {
    e.preventDefault();
    setSort({...sort, '_order': value});
  };

  const sortGuitarList = async () => {
    const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams.toString()}`);
    dispatch(updateGuitarsList(data));
  };

  useEffect(() => {
    setSearchParams(sort);
  }, [sort]);

  useEffect(() => {
    sortGuitarList();
  }, [searchParams]);

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
