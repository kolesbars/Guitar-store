import RatingStars from '../rating-stars/rating-stars';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectComentsCount } from '../../store/guitars-data/selectors';
import { getGuitarsIDInCart } from '../../store/cart-data/selectors';
import { loadGuitarComments } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoute, RatingStarsLocation} from '../../const';
import { GuitarType } from '../../types/guitar';

type GuitarCardProps = {
  guitar: GuitarType,
  onSetIsAddToCartModalHidden: (value: boolean) => void,
  onSetCurrentGuitarData: (value: GuitarType) => void,
}

function GuitarCard({guitar, onSetIsAddToCartModalHidden, onSetCurrentGuitarData}: GuitarCardProps):JSX.Element {
  const dispatch = useDispatch();

  const {previewImg, name, price, rating, id} = guitar;

  const commentsCount = useSelector(selectComentsCount(id));
  const guitarsIDInCart = useSelector(getGuitarsIDInCart);

  const handleBuyButtonClick = () => {
    onSetIsAddToCartModalHidden(false);
    onSetCurrentGuitarData(guitar);
  };

  useEffect(() => {
    dispatch(loadGuitarComments(id));
  }, [commentsCount]);

  return (
    <div className="product-card" data-testid='guitar-card'>
      <img
        src={`/${previewImg}`}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <RatingStars
            rating={rating}
            location={RatingStarsLocation.GuitarCard}
          />
          <span className="rate__count">{commentsCount}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Guitar}/${id}`}>
                      Подробнее
        </Link>
        {!guitarsIDInCart.includes(id) ?
          <button
            className="button button--red button--mini button--add-to-cart"
            onClick={handleBuyButtonClick}
          >
                      Купить
          </button> :
          <div>
            <Link
              className="button button--red-border button--mini button--in-cart"
              to={AppRoute.Cart}
            >В Корзине
            </Link>
          </div>}
      </div>
    </div>
  );
}

export default GuitarCard;
