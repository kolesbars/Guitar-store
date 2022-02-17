import RatingStars from '../rating-stars/rating-stars';
import { RatingStarsLocation } from '../../const';
import Dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { CommentType } from '../../types/guitar';

Dayjs.locale('ru');

type ReviewProps = {
  data: CommentType
}

function Review({data}: ReviewProps): JSX.Element {

  const {userName, advantage, disadvantage, createAt, comment, rating} = data;

  const commentDate = Dayjs(createAt).format('D MMMM');

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{commentDate}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <RatingStars
          rating={rating}
          location={RatingStarsLocation.Comment}
        />
        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default Review;
