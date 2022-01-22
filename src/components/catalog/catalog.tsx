import {AxiosInstance} from 'axios';
import { loadGuitarList} from '../../store/api-actions';
import { useEffect, useCallback} from 'react';
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
import Footer from '../footer/footer';
import { debounce } from 'ts-debounce';
import Header from '../header/header';

type MainProps = {
  api: AxiosInstance
}

function Catalog({api}: MainProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const guitars = useSelector(getGuitars);
  const isLoaded = useSelector(getLoadedDataStatus);

  const sortParams = useSelector(getSortParams);
  const filterParams = useSelector(getFilterParams);
  const paginationParams = useSelector(getPaginationParams);

  const dispatch = useDispatch();

  const loadGuitars = useCallback(debounce((params) => {
    dispatch(loadGuitarList(params.toString()));
  }, 500), []);

  useEffect(() => {
    setSearchParams({...sortParams, ...filterParams, ...paginationParams});
  }, [filterParams, sortParams, paginationParams]);

  useEffect(() => {
    loadGuitars(searchParams);
  }, [searchParams]);

  return (
    <>
      <div className="visually-hidden"></div>
      <div className="wrapper">
        <Header
          api={api}
          guitars={guitars}
        />
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
              <FiltersForm
                api={api}
              />
              <Sorting/>
              {isLoaded ?
                <GuitarCatalog
                  api={api}
                  guitars={guitars}
                /> :
                <Loading/>}
              <Pagination/>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Catalog;
