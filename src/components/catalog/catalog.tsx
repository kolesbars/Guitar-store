import {AxiosInstance} from 'axios';
import { useState, useEffect} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GuitarType } from '../../types/guitar';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuitarsList, updateTotalCount } from '../../store/action';
import { getGuitars } from '../../store/guitars-data/selectors';
import { getSortParams, getFilterParams, getPaginationParams } from '../../store/search-params/selectors';
import {APIRoute, AppRoute} from '../../const';
import GuitarCatalog from '../guitars-catalog/guitars-catalog';
import FiltersForm from '../filters-form/filters-form';
import Sorting from '../sorting/sorting';
import Pagination from '../pagination/pagination';
import Loading from '../loading/loading';
import Footer from '../footer/footer';
//import { toast } from 'react-toastify';
// import { debounce } from 'ts-debounce';
import Header from '../header/header';
import { toast } from 'react-toastify';

type MainProps = {
  api: AxiosInstance
}

function Catalog({api}: MainProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoaded, setIsLoaded] = useState(true);

  const guitars = useSelector(getGuitars);

  const sortParams = useSelector(getSortParams);
  const filterParams = useSelector(getFilterParams);
  const paginationParams = useSelector(getPaginationParams);

  const dispatch = useDispatch();

  const loadGuitarList = async () => {
    setIsLoaded(false);
    try {
      const response = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams.toString()}`);
      dispatch(updateGuitarsList(response.data));
      dispatch(updateTotalCount(response.headers['x-total-count']));
      setIsLoaded(true);
      //eslint-disable-next-line no-console
      console.log(response.data);
    } catch {
      toast.info('ошибка');
    }
  };

  useEffect(() => {
    setSearchParams({...sortParams, ...filterParams, ...paginationParams});
  }, [filterParams, sortParams, paginationParams]);

  useEffect(() => {
    loadGuitarList();
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
                <Link className="link" to={AppRoute.Navigation}>
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
