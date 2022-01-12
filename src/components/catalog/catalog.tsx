import {AxiosInstance} from 'axios';
import { useEffect} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GuitarType } from '../../types/guitar';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuitarsList } from '../../store/action';
import { getGuitars } from '../../store/guitars-data/selectors';
import {APIRoute} from '../../const';
import GuitarCatalog from '../guitars-catalog/guitars-catalog';
import FiltersForm from '../filters-form/filters-form';
import Sorting from '../sorting/sorting';
import Pagination from '../pagination/pagination';
import Header from '../header/header';

type MainProps = {
  api: AxiosInstance
}

function Catalog({api}: MainProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const guitars = useSelector(getGuitars);

  const dispatch = useDispatch();

  const loadGuitarList = async () => {
    const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams.toString()}`);
    dispatch(updateGuitarsList(data));
  };

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
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">
              Каталог гитар
            </h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to="./main.html">
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
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <Sorting
                api={api}
              />
              <GuitarCatalog
                api={api}
                guitars={guitars}
              />
              <Pagination/>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="footer__container container">
            <Link className="footer__logo logo" to='#'>
              <img
                className="logo__img"
                width="70"
                height="70"
                src="./img/svg/logo.svg"
                alt="Логотип"
              />
            </Link>
            <div className="socials footer__socials">
              <ul className="socials__list">
                <li className="socials-item">
                  <Link
                    className="socials__link"
                    to="https://www.facebook.com/"
                    aria-label="facebook"
                  >
                    <svg
                      className="socials__icon"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-facebook"></use>
                    </svg>
                  </Link>
                </li>
                <li className="socials-item">
                  <Link
                    className="socials__link"
                    to="https://www.instagram.com/"
                    aria-label="instagram"
                  >
                    <svg
                      className="socials__icon"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-instagram"></use>
                    </svg>
                  </Link>
                </li>
                <li className="socials-item">
                  <Link
                    className="socials__link"
                    to="https://www.twitter.com/"
                    aria-label="twitter"
                  >
                    <svg
                      className="socials__icon"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-twitter"></use>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
            <section className="footer__nav-section footer__nav-section--info">
              <h2 className="footer__nav-title">О нас</h2>
              <p className="footer__nav-content footer__nav-content--font-secondary">
                Магазин гитар, музыкальных инструментов и гитарная мастерская{' '}
                <br /> в Санкт-Петербурге.
                <br />
                <br />
                Все инструменты проверены, отстроены <br /> и доведены до
                идеала!
              </p>
            </section>
            <section className="footer__nav-section footer__nav-section--links">
              <h2 className="footer__nav-title">Информация</h2>
              <ul className="footer__nav-list">
                <li className="footer__nav-list-item">
                  <Link className="link" to="#top">
                    Где купить?
                  </Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link" to="#top">
                    Блог
                  </Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link" to="#top">
                    Вопрос - ответ
                  </Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link" to="#top">
                    Возврат
                  </Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link" to="#top">
                    Сервис-центры
                  </Link>
                </li>
              </ul>
            </section>
            <section className="footer__nav-section footer__nav-section--contacts">
              <h2 className="footer__nav-title">Контакты</h2>
              <p className="footer__nav-content">
                г. Санкт-Петербург,
                <br /> м. Невский проспект, <br />
                ул. Казанская 6.
              </p>
              <div className="footer__nav-content">
                <svg
                  className="footer__icon"
                  width="8"
                  height="8"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-phone"></use>
                </svg>
                <Link className="link" to="tel:88125005050">
                  {' '}
                  8-812-500-50-50
                </Link>
              </div>
              <p className="footer__nav-content">
                Режим работы:
                <br />
                <span className="footer__span">
                  <svg
                    className="footer__icon"
                    width="13"
                    height="13"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-clock"></use>
                  </svg>
                  <span> с 11:00 до 20:00</span>
                  <span>без выходных</span>
                </span>
              </p>
            </section>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Catalog;
