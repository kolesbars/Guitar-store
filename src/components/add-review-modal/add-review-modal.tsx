import { addGuitarComment } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import {ChangeEvent, SyntheticEvent, useState} from 'react';

type AddReviewModalProps = {
onSetIsReviewModalHidden: (value: boolean) => void,
onSetIsThanksModalHidden: (value: boolean) => void,
name: string,
id: number,
}

function AddReviewModal(props: AddReviewModalProps): JSX.Element {

  const {onSetIsReviewModalHidden, onSetIsThanksModalHidden, name, id} = props;

  const dispatch = useDispatch();

  const [reviewData, setReviewData] = useState({
    'guitarId': id,
    'userName': '',
    'advantage': '',
    'disadvantage': '',
    'comment': '',
    'rating': 0,
  });

  const handleChangeReviewData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewData((value) => ({...value, [e.target.id]: e.target.value}));
  };

  const handleChangeReviewRate = (e: ChangeEvent<HTMLInputElement>) => {
    setReviewData({...reviewData, 'rating': +e.target.value});
  };

  const handleCloseClick = () => {
    onSetIsReviewModalHidden(true);
  };

  const handleOverlayClick = () => {
    onSetIsReviewModalHidden(true);
  };

  const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addGuitarComment(reviewData));
    onSetIsReviewModalHidden(true);
    onSetIsThanksModalHidden(false);
  };

  return (
    <div className="modal is-active modal--review">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleOverlayClick}
        >
        </div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
          <form
            className="form-review"
            onSubmit={handleSubmitForm}
          >
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="userName">Ваше Имя</label>
                <input
                  className="form-review__input form-review__input--name"
                  id="userName"
                  type="text"
                  autoComplete="off"
                  value={reviewData.userName}
                  onChange={handleChangeReviewData}
                />
                <span className="form-review__warning">Заполните поле</span>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-5"
                    name="rate"
                    value="5"
                    checked={reviewData.rating === 5}
                    onChange={handleChangeReviewRate}
                  />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-4"
                    name="rate"
                    value="4"
                    checked={reviewData.rating === 4}
                    onChange={handleChangeReviewRate}
                  />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-3"
                    name="rate"
                    value="3"
                    checked={reviewData.rating === 3}
                    onChange={handleChangeReviewRate}
                  />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-2"
                    name="rate"
                    value="2"
                    checked={reviewData.rating === 2}
                    onChange={handleChangeReviewRate}
                  />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-1"
                    name="rate"
                    value="1"
                    checked={reviewData.rating === 1}
                    onChange={handleChangeReviewRate}
                  />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span><span className="rate__message">Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="advantage">Достоинства</label>
            <input
              className="form-review__input"
              id="advantage"
              type="text"
              autoComplete="off"
              value={reviewData.advantage}
              onChange={handleChangeReviewData}
            />
            <label className="form-review__label" htmlFor="disadvantage">Недостатки</label>
            <input
              className="form-review__input"
              id="disadvantage"
              type="text"
              autoComplete="off"
              value={reviewData.disadvantage}
              onChange={handleChangeReviewData}
            />
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              onChange={handleChangeReviewData}
            >
            </textarea>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseClick}
          >
            <span className="button-cross__icon">
            </span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReviewModal;
