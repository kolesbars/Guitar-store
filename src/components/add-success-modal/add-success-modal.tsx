import { AppRoute } from '../../const';
import { useNavigate, useLocation } from 'react-router';
import {Link} from 'react-router-dom';

type AddSuccessModalProps = {
  onSetIsAddSuccessModalHidden: (value: boolean) => void,
}

function AddSuccessModal({onSetIsAddSuccessModalHidden}: AddSuccessModalProps):JSX.Element {

  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseClick = () => {
    onSetIsAddSuccessModalHidden(true);
  };

  const handleToShoppingButtonClick = () => {
    onSetIsAddSuccessModalHidden(true);
    if (location.pathname !== AppRoute.Catalog) {
      navigate(AppRoute.Catalog);
    }
  };

  const handleOverlayClick = () => {
    onSetIsAddSuccessModalHidden(true);
  };

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
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
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <Link className="button button--small modal__button" to={AppRoute.Cart}>Перейти в корзину</Link>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={handleToShoppingButtonClick }
            >Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseClick}
          ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSuccessModal;
