import {AxiosInstance} from 'axios';
import { useEffect} from 'react';
import { GuitarType } from '../../types/guitar';
import GuitarCatalog from '../guitars-catalog/guitars-catalog';
import Sorting from '../sorting/sorting';
import Header from '../header/header';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuitarsList } from '../../store/action';
import { getGuitars } from '../../store/guitars-data/selectors';
import {APIRoute} from '../../const';

type MainProps = {
  api: AxiosInstance
}

function Main({api}: MainProps): JSX.Element {
  const guitars = useSelector(getGuitars);

  const dispatch = useDispatch();

  const loadGuitarList = async () => {
    const {data} = await api.get<GuitarType[]>(APIRoute.Guitars);
    dispatch(updateGuitarsList(data));
  };

  useEffect(() => {
    loadGuitarList();
  }, []);

  return (
    <>
      <div className="visually-hidden"></div>
      <div className="wrapper">
        <Header
          guitars={guitars}
        />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">
              Каталог гитар
            </h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <a className="link" href="./main.html">
                  Главная
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="link">Каталог</a>
              </li>
            </ul>
            <div className="catalog">
              <form className="catalog-filter">
                <h2 className="title title--bigger catalog-filter__title">
                  Фильтр
                </h2>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">
                    Цена, ₽
                  </legend>
                  <div className="catalog-filter__price-range">
                    <div className="form-input">
                      <label className="visually-hidden">
                        Минимальная цена
                      </label>
                      <input
                        type="number"
                        placeholder="1 000"
                        id="priceMin"
                        name="от"
                      />
                    </div>
                    <div className="form-input">
                      <label className="visually-hidden">
                        Максимальная цена
                      </label>
                      <input
                        type="number"
                        placeholder="30 000"
                        id="priceMax"
                        name="до"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">
                    Тип гитар
                  </legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="acoustic"
                      name="acoustic"
                    />
                    <label htmlFor="acoustic">Акустические гитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="electric"
                      name="electric"
                      checked
                    />
                    <label htmlFor="electric">Электрогитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="ukulele"
                      name="ukulele"
                      checked
                    />
                    <label htmlFor="ukulele">Укулеле</label>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">
                    Количество струн
                  </legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="4-strings"
                      name="4-strings"
                      checked
                    />
                    <label htmlFor="4-strings">4</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="6-strings"
                      name="6-strings"
                      checked
                    />
                    <label htmlFor="6-strings">6</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="7-strings"
                      name="7-strings"
                    />
                    <label htmlFor="7-strings">7</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      id="12-strings"
                      name="12-strings"
                      disabled
                    />
                    <label htmlFor="12-strings">12</label>
                  </div>
                </fieldset>
              </form>
              <Sorting/>
              <GuitarCatalog
                api={api}
                guitars={guitars}
              />
              <div className="pagination page-content__pagination">
                <ul className="pagination__list">
                  <li className="pagination__page pagination__page--active">
                    <a className="link pagination__page-link" href="1">
                      1
                    </a>
                  </li>
                  <li className="pagination__page">
                    <a className="link pagination__page-link" href="2">
                      2
                    </a>
                  </li>
                  <li className="pagination__page">
                    <a className="link pagination__page-link" href="3">
                      3
                    </a>
                  </li>
                  <li
                    className="pagination__page pagination__page--next"
                    id="next"
                  >
                    <a className="link pagination__page-link" href="2">
                      Далее
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="footer__container container">
            <a className="footer__logo logo">
              <img
                className="logo__img"
                width="70"
                height="70"
                src="./img/svg/logo.svg"
                alt="Логотип"
              />
            </a>
            <div className="socials footer__socials">
              <ul className="socials__list">
                <li className="socials-item">
                  <a
                    className="socials__link"
                    href="https://www.facebook.com/"
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
                  </a>
                </li>
                <li className="socials-item">
                  <a
                    className="socials__link"
                    href="https://www.instagram.com/"
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
                  </a>
                </li>
                <li className="socials-item">
                  <a
                    className="socials__link"
                    href="https://www.twitter.com/"
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
                  </a>
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
                  <a className="link" href="#top">
                    Где купить?
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link" href="#top">
                    Блог
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link" href="#top">
                    Вопрос - ответ
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link" href="#top">
                    Возврат
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link" href="#top">
                    Сервис-центры
                  </a>
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
                <a className="link" href="tel:88125005050">
                  {' '}
                  8-812-500-50-50
                </a>
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

export default Main;
