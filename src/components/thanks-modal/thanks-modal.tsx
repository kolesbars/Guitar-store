import { AppRoute } from '../../const';
import { useRef, useState, useEffect, FocusEvent, KeyboardEvent} from 'react';
import { KeyCode, ZERO_COORDINATE } from '../../const';
import {useNavigate} from 'react-router';


type ThanksModalProps = {
onSetIsThanksModalHidden: (value: boolean) => void,
id: number,
}

function ThanksModal({onSetIsThanksModalHidden, id}: ThanksModalProps): JSX.Element {

  const navigate = useNavigate();

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const buttonToShoppingRef = useRef<HTMLButtonElement | null>(null);

  const [focusedElement, setFocusedElement] = useState<HTMLButtonElement | null>(null);

  const handlClickToShopping = () => {
    navigate(`${AppRoute.Guitar}/${id}`);
    onSetIsThanksModalHidden(true);
    window.scroll(ZERO_COORDINATE, ZERO_COORDINATE);
  };

  const handleClickClose = () => {
    onSetIsThanksModalHidden(true);
  };

  const handleOverlayClick = () => {
    onSetIsThanksModalHidden(true);
  };

  const handleChangeFocus = (e:FocusEvent<HTMLButtonElement>) => {
    setFocusedElement(e.target);
  };


  const handleTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === KeyCode.Tab) {
      if (focusedElement === closeButtonRef.current) {
        setFocusedElement(buttonToShoppingRef.current);
      }
    }
    if(e.keyCode === KeyCode.Tab && e.shiftKey) {
      if (focusedElement === buttonToShoppingRef.current) {
        setFocusedElement(closeButtonRef.current);
      }
    }
  };

  useEffect(() => {
    setFocusedElement(closeButtonRef.current);
  }, []);

  useEffect(() => {
    focusedElement?.focus();
  }, [focusedElement]);

  return (
    <div
      className="modal is-active modal--success"
      onKeyDown={handleTabKeyDown}
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleOverlayClick}
        >
        </div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button
              ref={buttonToShoppingRef}
              className="button button--small modal__button modal__button--review"
              onClick={handlClickToShopping}
              onFocus={handleChangeFocus}
            >К покупкам!
            </button>
          </div>
          <button
            ref={closeButtonRef}
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleClickClose}
            onFocus={handleChangeFocus}
          >
            <span className="button-cross__icon">
            </span>
            <span className="modal__close-btn-interactive-area">
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThanksModal;
