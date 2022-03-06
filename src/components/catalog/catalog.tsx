import { loadGuitarList} from '../../store/api-actions';
import { useEffect, useCallback, useState, KeyboardEvent} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getGuitars, getLoadedDataStatus } from '../../store/guitars-data/selectors';
import { getSortParams, getFilterParams, getPaginationParams } from '../../store/search-params/selectors';
import {AppRoute} from '../../const';
import GuitarCatalog from '../guitars-catalog/guitars-catalog';
import FiltersForm from '../filters-form/filters-form';
import Sorting from '../sorting/sorting';
import Pagination from '../pagination/pagination';
import Loading from '../loading/loading';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';
import AddSuccessModal from '../add-success-modal/add-success-modal';
import { GuitarType } from '../../types/guitar';
import { debounce } from 'ts-debounce';
import {RemoveScroll} from 'react-remove-scroll';
import { KeyCode } from '../../const';
import FocusLock from 'react-focus-lock';

function Catalog(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const [isAddToCartModalHidden, setIsAddToCartModalHidden] = useState(true);
  const [isAddSuccessModalHidden, setIsAddSuccessModalHidden] = useState(true);
  const [currentGuitarData, setCurrentGuitarData] = useState<GuitarType>();

  const guitars = useSelector(getGuitars);
  const isLoaded = useSelector(getLoadedDataStatus);


  const sortParams = useSelector(getSortParams);
  const filterParams = useSelector(getFilterParams);
  const paginationParams = useSelector(getPaginationParams);

  const dispatch = useDispatch();

  const loadGuitars = useCallback(debounce((params) => {
    dispatch(loadGuitarList(params.toString()));
  }, 500), []);

  const handleEscKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === KeyCode.Escape) {
      setIsAddToCartModalHidden(true);
      setIsAddSuccessModalHidden(true);
    }
  };

  useEffect(() => {
    setSearchParams({...sortParams, ...filterParams, ...paginationParams});
  }, [filterParams, sortParams, paginationParams]);

  useEffect(() => {
    loadGuitars(searchParams);
  }, [searchParams]);

  return (
    <>
      <div
        className="wrapper"
        onKeyDown={handleEscKeyDown}
      >
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">
              Каталог гитар
            </h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>
                  Главная
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to='#'>Каталог</Link>
              </li>
            </ul>
            <div className="catalog">
              <FiltersForm/>
              <Sorting/>
              {isLoaded ?
                <GuitarCatalog
                  guitars={guitars}
                  onSetIsAddToCartModalHidden={setIsAddToCartModalHidden}
                  onSetCurrentGuitarData={setCurrentGuitarData}
                /> :
                <Loading/>}
              <Pagination/>
            </div>
          </div>
        </main>
      </div>
      {!isAddToCartModalHidden &&
      <RemoveScroll>
        <FocusLock>
          <AddToCartModal
            data={currentGuitarData}
            onSetIsAddToCartModalHidden={setIsAddToCartModalHidden}
            onSetIsAddSuccessModalHidden={setIsAddSuccessModalHidden}
          />
        </FocusLock>
      </RemoveScroll>}
      {!isAddSuccessModalHidden &&
      <RemoveScroll>
        <FocusLock>
          <AddSuccessModal
            onSetIsAddSuccessModalHidden={setIsAddSuccessModalHidden}
          />
        </FocusLock>
      </RemoveScroll>}
    </>
  );
}

export default Catalog;
