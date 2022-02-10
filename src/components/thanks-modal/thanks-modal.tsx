import { AppRoute } from '../../const';
import {useNavigate} from 'react-router';


type ThanksModalProps = {
onSetIsThanksModalHidden: (value: boolean) => void,
id: number,
}

function ThanksModal({onSetIsThanksModalHidden, id}: ThanksModalProps): JSX.Element {

  const navigate = useNavigate();

  const handlClickToShopping = () => {
    navigate(`${AppRoute.Guitar}/${id}`);
    onSetIsThanksModalHidden(true);
    window.scroll(0,0);
  };

  const handleClickClose = () => {
    onSetIsThanksModalHidden(true);
  };

  const handleOverlayClick = () => {
    onSetIsThanksModalHidden(true);
  };

  return (
    <div className="modal is-active modal--success">
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
              className="button button--small modal__button modal__button--review"
              onClick={handlClickToShopping}
            >К покупкам!
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleClickClose}
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
