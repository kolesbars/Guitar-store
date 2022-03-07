import { useState, useEffect, ChangeEvent } from 'react';
import { GuitarType } from '../../types/guitar';
import { updateTotalPrices, updateTotalQuantity } from '../../store/action';
import { getGuitarsIDInCart } from '../../store/cart-data/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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

  const {
    id,
    api,
    onSetIsDeleteFromCartModalHidden,
    onSetRemovableGuitar} = props;

  const dispatch = useDispatch();

  const guitarsIDInCart = useSelector(getGuitarsIDInCart);

  const [guitarData, setGuitarData] = useState<GuitarType>(emptyGuitar);
  const [quantity, setQuantity] = useState(1);

  const {name, previewImg, vendorCode, price, stringCount} = guitarData;

  const [totalGuitarsPrice, setTotalGuitarPrice] = useState(price);

  const handleDeleteClick = () => {
    onSetIsDeleteFromCartModalHidden(false);
    onSetRemovableGuitar(guitarData);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(+e.target.value <= 0) {
      setQuantity(1);
    } else if (+e.target.value > 99) {
      setQuantity(99);
    } else{
      setQuantity(+e.target.value);
    }
    localStorage.setItem(`${id}`, JSON.stringify(quantity));
  };

  const handleMinusClick = () => {
    if (quantity === 1) {
      onSetIsDeleteFromCartModalHidden(false);
      onSetRemovableGuitar(guitarData);
      localStorage.removeItem(`${id}`);
      localStorage.setItem('guitarsIDInCart', JSON.stringify([]));
    } else {
      setQuantity(quantity-1);
      localStorage[`${id}`] = JSON.stringify(quantity-1);
      localStorage.setItem('guitarsIDInCart', JSON.stringify(guitarsIDInCart));
    }
  };

  const handlePlusClick = () => {
    if (quantity < 99) {
      setQuantity(quantity+1);
    }
    localStorage[`${id}`] = JSON.stringify(quantity+1);
  };

  useEffect(() => {
    const storageQuantity = localStorage.getItem(`${id}`);
    if(storageQuantity !== null) {
      setQuantity(JSON.parse(storageQuantity));
    }
  }, []);

  useEffect(() => {
    if (quantity !== 0) {
      setTotalGuitarPrice(price*quantity);
    }
  }, [quantity, price]);

  useEffect(() => {
    dispatch(updateTotalPrices(
      {
        id: id,
        price: price,
      },
    ));
  }, []);

  useEffect(() => {
    dispatch(updateTotalPrices(
      {
        id: id,
        price: totalGuitarsPrice,
      },
    ));
  }, [totalGuitarsPrice, id]);

  useEffect(() => {
    dispatch(updateTotalQuantity(
      {
        id: id,
        quantity: quantity,
      },
    ));
  }, [quantity, id]);

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
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleMinusClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          max="99"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handlePlusClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{`${totalGuitarsPrice} ₽`}</div>
    </div>);
}

export default CartItem;
