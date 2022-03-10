import { deleteGuitarFromCart, setIsDeleteFromCartModalHidden } from '../../store/action';
import {useDispatch} from 'react-redux';
import { updateDiscount } from '../../store/action';
import { getGuitarType } from '../../utils/common';
import { GuitarType } from '../../types/guitar';
import { KeyboardEvent } from 'react';
import { KeyCode, STORAGE_GUITARS_LIST_DEFAULT_LENGTH, DEFAULT_DISCOUNT} from '../../const';

type DeleteFromCartModalProps = {
  data?: GuitarType,
}

function DeleteFromCartModal({data}:DeleteFromCartModalProps):JSX.Element {

  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    const guitarsID = localStorage.getItem('guitarsIDInCart');
    if(data?.id)  {
      dispatch(deleteGuitarFromCart(data.id));
      dispatch(setIsDeleteFromCartModalHidden(true));
      if (guitarsID !== null && JSON.parse(guitarsID).length === STORAGE_GUITARS_LIST_DEFAULT_LENGTH) {
        localStorage.setItem('guitarsIDInCart', JSON.stringify([]));
        localStorage.removeItem('discount');
        dispatch(updateDiscount(DEFAULT_DISCOUNT));
      }
      localStorage.removeItem(`${data.id}`);
    }
  };

  const handleEscKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === KeyCode.Escape) {
      dispatch(setIsDeleteFromCartModalHidden(true));
    }
  };

  const handleCloseClick = () => {
    dispatch(setIsDeleteFromCartModalHidden(true));
  };

  const handleToShoppingButtonClick = () => {
    dispatch(setIsDeleteFromCartModalHidden(true));
  };

  const handleOverlayClick = () => {
    dispatch(setIsDeleteFromCartModalHidden(true));
  };

  return (
    <div className="modal is-active modal-for-ui-kit" onKeyDown={handleEscKeyDown}>
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
