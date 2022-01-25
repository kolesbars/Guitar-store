import RatingStars from '../rating-stars/rating-stars';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsCounts } from '../../store/guitars-data/selectors';
import { loadGuitarComments } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { GuitarType } from '../../types/guitar';

type GuitarCardProps = {
  guitar: GuitarType
}

function GuitarCard({guitar}: GuitarCardProps):JSX.Element {
  const dispatch = useDispatch();

  const {previewImg, name, price, rating, id} = guitar;

  const commentsCounts = useSelector(getCommentsCounts);

  const [count, setCount] = useState<number | undefined>();


  useEffect(() => {
    if (commentsCounts) {
      setCount(commentsCounts.find((item) => item.id === id)?.count);
    }
  }, [commentsCounts]);

  useEffect(() => {
    dispatch(loadGuitarComments(id));
  }, [count]);

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
          <RatingStars rating={rating}/>
          <span className="rate__count">{count}</span>
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
        <Link
          className="button button--red button--mini button--add-to-cart"
          to="#"
        >
                      Купить
        </Link>
      </div>
    </div>
  );
}

export default GuitarCard;
