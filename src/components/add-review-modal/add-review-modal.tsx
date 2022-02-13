import { addGuitarComment } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { KeyCode } from '../../const';
import {ChangeEvent, SyntheticEvent, KeyboardEvent, FocusEvent, useState, useRef, useEffect} from 'react';

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

  const [isRequiredFieldsFilled, setIsRequiredFieldsFilled] = useState({
    name: false,
    rating: false,
  });

  const [focusedElement, setFocusedElement] = useState<
  HTMLInputElement |
  HTMLButtonElement |
  HTMLDivElement |
  HTMLTextAreaElement |
  null>(null);

  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const escButtonRef = useRef<HTMLButtonElement | null>(null);

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

  const handleChangeFocus = (e:FocusEvent<
    HTMLInputElement |
    HTMLButtonElement |
    HTMLDivElement |
    HTMLTextAreaElement>) => {
    setFocusedElement(e.target);
  };


  const handleTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === KeyCode.Tab) {
      if (focusedElement === escButtonRef.current) {
        setFocusedElement(nameFieldRef.current);
      }
    }
    if(e.keyCode === KeyCode.Tab && e.shiftKey) {
      if (focusedElement === nameFieldRef.current) {
        setFocusedElement(escButtonRef.current);
      } else  if (focusedElement === escButtonRef.current) {
        setFocusedElement(submitButtonRef.current);
      }
    }
  };

  const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewData.userName !== '' && reviewData.rating !== 0) {
      dispatch(addGuitarComment(reviewData));
      onSetIsReviewModalHidden(true);
      onSetIsThanksModalHidden(false);
      setIsRequiredFieldsFilled({
        name: false,
        rating: false,
      });
    } else if (reviewData.userName === '') {
      setIsRequiredFieldsFilled({
        ...isRequiredFieldsFilled, name: true,
      });
    } else if (reviewData.rating === 0) {
      setIsRequiredFieldsFilled({
        ...isRequiredFieldsFilled, rating: true,
      });
    }
  };

  useEffect(() => {
    setFocusedElement(escButtonRef.current);
  }, []);

  useEffect(() => {
    focusedElement?.focus();
  }, [focusedElement]);

  return (
    <div className="modal is-active modal--review" onKeyDown={handleTabKeyDown}>
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
                  ref={nameFieldRef}
                  className="form-review__input form-review__input--name"
                  id="userName"
                  type="text"
                  autoComplete="off"
                  value={reviewData.userName}
                  onChange={handleChangeReviewData}
                  onFocus={handleChangeFocus}
                />
                {isRequiredFieldsFilled.name && <span className="form-review__warning">Заполните поле</span>}
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div
                  dir='rtl'
                  className="rate rate--reverse"
                  onFocus={handleChangeFocus}
                >
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
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span>
                  {isRequiredFieldsFilled.rating && <span className="rate__message">Поставьте оценку</span>}
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
              required
              onFocus={handleChangeFocus}
            />
            <label className="form-review__label" htmlFor="disadvantage">Недостатки</label>
            <input
              className="form-review__input"
              id="disadvantage"
              type="text"
              autoComplete="off"
              value={reviewData.disadvantage}
              onChange={handleChangeReviewData}
              required
              onFocus={handleChangeFocus}
            />
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              onChange={handleChangeReviewData}
              onFocus={handleChangeFocus}
            >
            </textarea>
            <button
              className="button button--medium-20 form-review__button"
              type="submit"
              ref={submitButtonRef}
              onFocus={handleChangeFocus}
            >Отправить отзыв
            </button>
          </form>
          <button
            ref={escButtonRef}
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseClick}
            onFocus={handleChangeFocus}
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
