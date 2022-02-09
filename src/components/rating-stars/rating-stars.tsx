import { useState, useEffect } from 'react';
import {RATING_STAR_MAX_VALUE, RatingStarsLocation} from '../../const';

type RatingStarsProps = {
  rating: number,
  location: string,
}

function RatingStars({rating, location}: RatingStarsProps): JSX.Element {

  const [starSizes, setStarSizes] = useState({
    width: '0',
    height: '0',
  });

  const getStarSizes = (value: string) => {
    switch (value) {
      case RatingStarsLocation.GuitarCard:
        setStarSizes({
          width: '12',
          height: '11',
        });
        break;
      case RatingStarsLocation.GuitarScreen:
        setStarSizes({
          width: '14',
          height: '14',
        });
        break;
      case RatingStarsLocation.Comment:
        setStarSizes({
          width: '16',
          height: '16',
        });
        break;
      default:
        setStarSizes({
          width: '12',
          height: '11',
        });
        break;
    }
  };

  useEffect(() => {
    getStarSizes(location);
  }, [location]);

  const getRatingStars = (ratingValue: number) => {
    const stars = [];

    for (let i = 0; i < Math.ceil(ratingValue); i++) {
      stars.push(
        <svg width={starSizes.width} height={starSizes.height} aria-hidden="true" key={`${i}-star`}>
          <use xlinkHref="#icon-full-star" data-testid='rating-star'></use>
        </svg>);
    }
    for (let i = 0; i < Math.floor(RATING_STAR_MAX_VALUE - ratingValue); i++) {
      stars.push(
        <svg width={starSizes.width} height={starSizes.height} aria-hidden="true" key={`${RATING_STAR_MAX_VALUE - i}-star`}>
          <use xlinkHref="#icon-star"></use>
        </svg>);
    }

    return stars;
  };

  return (
    <>
      {getRatingStars(rating).map((star) => star)}
    </>

  );
}

export default RatingStars;
