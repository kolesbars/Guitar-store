import { useState, useEffect, ChangeEvent } from 'react';
import { GuitarType } from '../../types/guitar';
import { getGuitarsIDInCart } from '../../store/cart-data/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { APIRoute } from '../../const';
import { emptyGuitar, ItemQuantity } from '../../const';
import {AxiosInstance} from 'axios';
import {
  updateTotalPrices,
  updateTotalQuantity,
  setIsDeleteFromCartModalHidden } from '../../store/action';

type CartItemProps = {
  id: number,
  api: AxiosInstance,
  onSetRemovableGuitar: (value: GuitarType) => void,
}

function CartItem(props: CartItemProps): JSX.Element {

  const {
    id,
    api,
    onSetRemovableGuitar} = props;

  const dispatch = useDispatch();

  const guitarsIDInCart = useSelector(getGuitarsIDInCart);

  const [guitarData, setGuitarData] = useState<GuitarType>(emptyGuitar);
  const [quantity, setQuantity] = useState(1);

  const {name, previewImg, vendorCode, price, stringCount} = guitarData;

  const [totalGuitarsPrice, setTotalGuitarPrice] = useState(price);

  const handleDeleteClick = () => {
    dispatch(setIsDeleteFromCartModalHidden(false));
    onSetRemovableGuitar(guitarData);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(+e.target.value <= ItemQuantity.zero) {
      setQuantity(ItemQuantity.min);
    } else if (+e.target.value > ItemQuantity.max) {
      setQuantity(ItemQuantity.max);
    } else{
      setQuantity(+e.target.value);
    }
    localStorage.setItem(`${id}`, JSON.stringify(quantity));
  };

  const handleMinusClick = () => {
    if (quantity === ItemQuantity.min) {
      dispatch(setIsDeleteFromCartModalHidden(false));
      onSetRemovableGuitar(guitarData);
      localStorage.removeItem(`${id}`);
    } else {
      setQuantity(quantity-ItemQuantity.step);
      localStorage.setItem(`${id}`, JSON.stringify(quantity-ItemQuantity.step));
      localStorage.setItem('guitarsIDInCart', JSON.stringify(guitarsIDInCart));
    }
  };

  const handlePlusClick = () => {
    if (quantity < ItemQuantity.max) {
      setQuantity(quantity+ItemQuantity.step);
    }
    localStorage.setItem(`${id}`, JSON.stringify(quantity+ItemQuantity.step));
  };

  useEffect(() => {
    const storageQuantity = localStorage.getItem(`${id}`);
    if(storageQuantity !== null) {
      setQuantity(JSON.parse(storageQuantity));
    }
  }, []);

  useEffect(() => {
    if (quantity !== ItemQuantity.zero) {
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
