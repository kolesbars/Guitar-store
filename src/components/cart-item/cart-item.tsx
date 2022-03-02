import { useState, useEffect } from 'react';
import { GuitarType } from '../../types/guitar';
import { APIRoute } from '../../const';
import { emptyGuitar } from '../../const';
import {AxiosInstance} from 'axios';

type CartItemProps = {
  id: number,
  api: AxiosInstance,
  onSetIsDeleteFromCartModalHidden: (value: boolean) => void,
  onSetRemovableGuitar: (value: GuitarType) => void,
}

function CartItem(props: CartItemProps): JSX.Element {

  const {id, api, onSetIsDeleteFromCartModalHidden, onSetRemovableGuitar} = props;

  const [guitarData, setGuitarData] = useState<GuitarType>(emptyGuitar);

  const {name, previewImg, vendorCode, price, stringCount} = guitarData;

  const handleDeleteClick = () => {
    onSetIsDeleteFromCartModalHidden(false);
    onSetRemovableGuitar(guitarData);
  };

  useEffect(() => {
    api.get<GuitarType>(`${APIRoute.Guitars}/${id}`).then((resp) => {
      setGuitarData(resp.data);
    });
  }, [id]);

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      >
        <span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={previewImg} width="50" height="130" alt={name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">{`Артикул: ${vendorCode}`}</p>
        <p className="product-info__info">{`Электрогитара, ${stringCount} струнная`}</p>
      </div>
      <div className="cart-item__price">{`${price} ₽`}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99"/>
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{`${price} ₽`}</div>
    </div>);
}

export default CartItem;
