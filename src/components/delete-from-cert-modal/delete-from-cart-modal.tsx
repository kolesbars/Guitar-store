import { deleteGuitarFromCart } from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import { getGuitarType } from '../../utils/common';
import { getGuitarsIDInCart } from '../../store/cart-data/selectors';
import { GuitarType } from '../../types/guitar';

type DeleteFromCartModalProps = {
  data?: GuitarType,
  onSetIsDeleteFromCartModalHidden: (value: boolean) => void,
}

function DeleteFromCartModal({data, onSetIsDeleteFromCartModalHidden}:DeleteFromCartModalProps):JSX.Element {

  const dispatch = useDispatch();

  const guitarsIDInCart = useSelector(getGuitarsIDInCart);

  const handleDeleteButtonClick = () => {
    if(data?.id) {
      dispatch(deleteGuitarFromCart(data.id));
      onSetIsDeleteFromCartModalHidden(true);
      localStorage.setItem('guitarsIDInCart', JSON.stringify(guitarsIDInCart));
    }
  };

  const handleCloseClick = () => {
    onSetIsDeleteFromCartModalHidden(true);
  };

  const handleToShoppingButtonClick = () => {
    onSetIsDeleteFromCartModalHidden(true);
  };

  const handleOverlayClick = () => {
    onSetIsDeleteFromCartModalHidden(true);
  };

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleOverlayClick}
        >
        </div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info"><img className="modal__img" src={data?.previewImg} width="67" height="137" alt={data?.name}/>
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">{`Гитара ${data?.name}`}</h3>
              <p className="modal__product-params modal__product-params--margin-11">{`Артикул: ${data?.vendorCode}`}</p>
              <p className="modal__product-params">{`${getGuitarType(data?.type)}, ${data?.stringCount} струнная`}</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{`${data?.price} ₽`}</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={handleDeleteButtonClick}
            >Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={handleToShoppingButtonClick}
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

export default DeleteFromCartModal;
