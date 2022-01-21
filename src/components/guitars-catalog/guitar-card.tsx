import RatingStars from './rating-star';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, ErrorMessage } from '../../const';
import { GuitarType } from '../../types/guitar';

type GuitarCardProps = {
  api: AxiosInstance
  guitar: GuitarType
}

function GuitarCard({guitar, api}: GuitarCardProps):JSX.Element {

  const {previewImg, name, price, rating, id} = guitar;

  const [commentsCount, setCommentsCount] = useState(0);

  const loadGuitarComments = async () => {
    try {
      const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}/${id}/comments`);
      setCommentsCount(data.length);
    } catch {
      Error(ErrorMessage.FailLoading);
    }
  };

  useEffect(() => {
    loadGuitarComments();
  }, []);

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
