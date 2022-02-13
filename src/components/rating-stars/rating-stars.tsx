import { useState, useEffect } from 'react';
import {RATING_STAR_MAX_VALUE, RatingStarsLocation, RatingStarsSizes} from '../../const';

type RatingStarsProps = {
  rating: number,
  location: string,
}

function RatingStars({rating, location}: RatingStarsProps): JSX.Element {

  const [starSizes, setStarSizes] = useState({
    width: RatingStarsSizes.defaultWidth,
    height: RatingStarsSizes.defaultHeight,
  });

  const getStarSizes = (value: string) => {
    switch (value) {
      case RatingStarsLocation.GuitarCard:
        setStarSizes({
          width: RatingStarsSizes.inCardWidth,
          height: RatingStarsSizes.inCardHeight,
        });
        break;
      case RatingStarsLocation.GuitarScreen:
        setStarSizes({
          width: RatingStarsSizes.inGuitarScreenWidth,
          height: RatingStarsSizes.inGuitarScreenHeight,
        });
        break;
      case RatingStarsLocation.Comment:
        setStarSizes({
          width: RatingStarsSizes.inCommentWidth,
          height: RatingStarsSizes.inCommentHeight,
        });
        break;
      default:
        setStarSizes({
          width: RatingStarsSizes.defaultWidth,
          height: RatingStarsSizes.defaultHeight,
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
