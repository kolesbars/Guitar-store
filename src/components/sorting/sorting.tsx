import { updateGuitarsList } from '../../store/action';
import { getGuitars } from '../../store/guitars-data/selectors';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

//catalog-sort__order-button--active
function Sorting(): JSX.Element {
  const dispatch = useDispatch();

  const guitars = useSelector(getGuitars);

  const [activeSortType, setActiveSortType] = useState('');
  const [activeSortOrder, setActiveSortOrder] = useState('');

  const handleClickSortByPrice = (): void => {
    setActiveSortType('price');
    if (activeSortOrder === 'increase' || activeSortOrder === '') {
      dispatch(updateGuitarsList([...guitars].sort((a, b) => a.price - b.price )));
    } else if (activeSortOrder === 'decrease') {
      dispatch(updateGuitarsList([...guitars].sort((a, b) => b.price - a.price )));
    }
  };

  const handleClickSortByRating = (): void => {
    setActiveSortType('rating');
    if (activeSortOrder === 'increase' || activeSortOrder === '') {
      dispatch(updateGuitarsList([...guitars].sort((a, b) => a.rating - b.rating )));
    } else if (activeSortOrder === 'decrease') {
      dispatch(updateGuitarsList([...guitars].sort((a, b) => b.rating - a.rating )));
    }
  };

  const handleClickSortByIncrease = (): void => {
    setActiveSortOrder('increase');
    if (activeSortType === 'price' || activeSortType === '') {
      setActiveSortType('price');
      dispatch(updateGuitarsList([...guitars].sort((a, b) => a.price - b.price )));
    } else if (activeSortType === 'rating') {
      dispatch(updateGuitarsList([...guitars].sort((a, b) => a.rating - b.rating )));
    }
  };

  const handleClickSortByDecrease = (): void => {
    setActiveSortOrder('decrease');
    if (activeSortType === 'price' || activeSortType === '') {
      setActiveSortType('price');
      dispatch(updateGuitarsList([...guitars].sort((a, b) => b.price - a.price )));
    } else if (activeSortType === 'rating') {
      dispatch(updateGuitarsList([...guitars].sort((a, b) => b.rating - a.rating )));
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button
          ${activeSortType === 'price' ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tab-index="-1"
          onClick={(evt) => {
            evt.preventDefault();
            handleClickSortByPrice();
          }}
        >
                    по цене
        </button>
        <button
          className={`catalog-sort__type-button
          ${activeSortType === 'rating' ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={(evt) => {
            evt.preventDefault();
            handleClickSortByRating();
          }}
        >
                    по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${activeSortOrder === 'increase' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tab-index="-1"
          onClick={(evt) => {
            evt.preventDefault();
            handleClickSortByIncrease();
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${activeSortOrder === 'decrease' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={(evt) => {
            evt.preventDefault();
            handleClickSortByDecrease();
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
