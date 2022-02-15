import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadGuitarData, loadCurrentGuitarComments} from '../../store/api-actions';
import { KeyboardEvent, useEffect, useState} from 'react';
import RatingStars from '../rating-stars/rating-stars';
import Review from '../review/review';
import { AppRoute, COMMENTS_RANGE } from '../../const';
import AddReviewModal from '../add-review-modal/add-review-modal';
import ThanksModal from '../thanks-modal/thanks-modal';
import Loading from '../loading/loading';
import { Link } from 'react-router-dom';
import {KeyCode} from '../../const';
import {RemoveScroll} from 'react-remove-scroll';
import {
  getGuitarData,
  getComments,
  getDataLoadingStatus,
  getCommentsLoadingStatus,
  getCommentSendingStatus
} from '../../store/current-guitar-data/selectors';
import {
  RatingStarsLocation,
  GuitarType,
  GuitarScreenTabs,
  ZERO_COORDINATE,
  COMMENTS_START_COUNT,
  PAGE_DIVIDER_COUNT } from '../../const';

function GuitarScreen(): JSX.Element {

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState(GuitarScreenTabs.Specifications);
  const [commentsRange, setCommentsRange] = useState(COMMENTS_RANGE);
  const [isReviewModalHidden, setIsReviewModalHidden] = useState(true);
  const [isThanksModalHidden, setIsThanksModalHidden] = useState(true);

  const guitarData = useSelector(getGuitarData);
  const comments = useSelector(getComments);
  const loadingDataStatus = useSelector(getDataLoadingStatus);
  const loadingCommentsStatus = useSelector(getCommentsLoadingStatus);
  const sendingCommentStatus = useSelector(getCommentSendingStatus);

  const sortedComments = [...comments].sort((a,b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  const {name, vendorCode, description, price, stringCount, previewImg, rating, type} = guitarData;

  const {id} = useParams<{id: string}>();

  const getGuitarType = (value: string) => {
    switch (value) {
      case GuitarType.Acoustic:
        return 'Акустическая гитара';
      case GuitarType.Electric:
        return 'Электрогитара';
      case GuitarType.Ukulele:
        return 'Укулеле';
      default:
        break;
    }
  };

  const handleTabClick = (value: GuitarScreenTabs) => {
    setCurrentTab(value);
  };

  const handleShowMoreButtonClick = () => {
    setCommentsRange(commentsRange + COMMENTS_RANGE);
  };

  const handleToUpButtonClick = () => {
    window.scroll(ZERO_COORDINATE, ZERO_COORDINATE);
  };

  const handleClickAddReview = () => {
    setIsReviewModalHidden(false);
  };

  const handleEscKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === KeyCode.Escape) {
      setIsReviewModalHidden(true);
      setIsThanksModalHidden(true);
    }
  };

  function checkPosition() {
    const height = document.body.offsetHeight;

    const screenHeight = window.innerHeight;

    const threshold = height - screenHeight / PAGE_DIVIDER_COUNT;

    const scrolled = window.scrollY;

    const position = scrolled + screenHeight;

    if (position >= threshold) {
      setCommentsRange(commentsRange + COMMENTS_RANGE);
    }
  }

  const handleWindowScroll = () => {
    checkPosition();
  };

  useEffect(() => {
    document.addEventListener('scroll', handleWindowScroll);

    return function () {
      document.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWindowScroll]);

  useEffect(() => {
    window.scroll(ZERO_COORDINATE, ZERO_COORDINATE);
    setCommentsRange(COMMENTS_RANGE);
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(loadGuitarData(id));
      dispatch(loadCurrentGuitarComments(id));
    }
  }, [id]);

  return (
    <div
      className="wrapper"
      onKeyDown={handleEscKeyDown}
    >
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to='#'>{name}</Link>
            </li>
          </ul>
          {loadingDataStatus ?
            <div className="product-container"><img className="product-container__img" src={`/${previewImg}`} width="90" height="235" alt=""/>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
                <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                  <RatingStars
                    rating={rating}
                    location={RatingStarsLocation.GuitarScreen}
                  />
                  <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
                </div>
                <div className="tabs">
                  <Link
                    className={`button button--medium tabs__button
                  ${currentTab !== GuitarScreenTabs.Specifications ? 'button--black-border' : ''}`}
                    to="#"
                    data-testid='characteristics'
                    onClick={() => {
                      handleTabClick(GuitarScreenTabs.Specifications);
                    }}
                  >Характеристики
                  </Link>
                  <Link
                    className={`button button--medium tabs__button
                  ${currentTab !== GuitarScreenTabs.Description ? 'button--black-border' : ''}`}
                    to="#"
                    data-testid='description'
                    onClick={() => {
                      handleTabClick(GuitarScreenTabs.Description);
                    }}
                  >Описание
                  </Link>
                  <div className="tabs__content" id="characteristics">
                    {currentTab === GuitarScreenTabs.Specifications &&

                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{getGuitarType(type)}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{stringCount} струнная</td>
                        </tr>
                      </tbody>
                    </table>}
                    {currentTab === GuitarScreenTabs.Description &&
                    <p className="tabs__product-description">{description}</p>}
                  </div>
                </div>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">{price} ₽</p><Link className="button button--red button--big product-container__button" to="#">Добавить в корзину</Link>
              </div>
            </div> :
            <Loading/>}
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <Link
              className="button button--red-border button--big reviews__sumbit-button"
              to="#"
              onClick={handleClickAddReview}
            >Оставить отзыв
            </Link>
            {loadingCommentsStatus ?
              sortedComments.slice(COMMENTS_START_COUNT, commentsRange).map((comment) =>
                (
                  <Review
                    key={comment.id}
                    data={comment}
                  />))
              : <Loading/>}
            {sortedComments.length === 0 && <p>Отзывов пока нет</p>}
            {commentsRange < comments.length &&
              <button
                className="button button--medium reviews__more-button"
                onClick={handleShowMoreButtonClick}
              >Показать еще отзывы
              </button>}
            <Link
              className="button button--up button--red-border button--big reviews__up-button"
              to="#"
              onClick={handleToUpButtonClick}
            >Наверх
            </Link>
            {!isReviewModalHidden &&
            <RemoveScroll>
              <AddReviewModal
                onSetIsReviewModalHidden={setIsReviewModalHidden}
                onSetIsThanksModalHidden={setIsThanksModalHidden}
                name={name}
                id={guitarData.id}
              />
            </RemoveScroll>}
            {!isThanksModalHidden && sendingCommentStatus &&
            <RemoveScroll>
              <ThanksModal
                onSetIsThanksModalHidden={setIsThanksModalHidden}
                id={guitarData.id}
              />
            </RemoveScroll>}
          </section>
        </div>
      </main>
    </div>
  );
}

export default GuitarScreen;
