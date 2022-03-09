import { AppRoute, KeyCode } from '../../const';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, KeyboardEvent, ChangeEvent, SyntheticEvent } from 'react';
import { getGuitarsIDInCart, getDiscount, getIsSuccess} from '../../store/cart-data/selectors';
import CartItem from '../cart-item/cart-item';
import { AxiosInstance } from 'axios';
import DeleteFromCartModal from '../delete-from-cert-modal/delete-from-cart-modal';
import {Link} from 'react-router-dom';
import { GuitarType } from '../../types/guitar';
import {RemoveScroll} from 'react-remove-scroll';
import { getTotalPrices } from '../../store/cart-data/selectors';
import { applyCoupon } from '../../store/api-actions';
import { calculateDiscount } from '../../utils/common';
import FocusLock from 'react-focus-lock';

type CartProps = {
  api: AxiosInstance
};

function Cart({api}:CartProps):JSX.Element {

  const dispatch = useDispatch();

  const guitarsIDInCart = useSelector(getGuitarsIDInCart);
  const discount = useSelector(getDiscount);
  const isSuccess = useSelector(getIsSuccess);

  const guitarPrices = useSelector(getTotalPrices);

  const [isDeleteFromCartModalHidden, setIsDeleteFromCartModalHidden] = useState(true);
  const [removableGuitar, setRemovableGuitar] = useState<GuitarType>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [coupon, setCoupon] = useState({
    coupon: '',
  });

  const handleEscKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === KeyCode.Escape) {
      setIsDeleteFromCartModalHidden(true);
    }
  };

  const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoupon({ coupon : e.target.value});
  };

  const handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(applyCoupon(coupon));
  };

  useEffect(() => {
    const storageDiscountValue = localStorage.getItem('discountValue');
    if (storageDiscountValue !== null) {
      setDiscountValue(+storageDiscountValue);
    }
  }, []);

  useEffect(() => {
    setDiscountValue(calculateDiscount(totalPrice, discount));
  }, [discount, totalPrice]);

  useEffect(() => {
    if (discountValue) {
      localStorage.setItem('discountValue', discountValue.toString());
    }
  }, [discountValue]);

  useEffect(() => {
    setTotalPrice(guitarPrices?.reduce((prev, current) => prev + current.price, 0));
  }, [guitarPrices]);

  return (
    <main className="page-content">
      <div
        className="container"
        onKeyDown={handleEscKeyDown}
      >
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
          <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Главная</Link>
          </li>
          <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Catalog}>Каталог</Link>
          </li>
          <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Cart}>Корзина</Link>
          </li>
        </ul>
        <div className="cart">
          {guitarsIDInCart.map((id) =>
            (
              <CartItem
                key={id}
                id={id}
                api={api}
                onSetIsDeleteFromCartModalHidden={setIsDeleteFromCartModalHidden}
                onSetRemovableGuitar={setRemovableGuitar}
              />))}
          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">Промокод на скидку</h2>
              <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
              <form
                className="coupon__form"
                id="coupon-form"
                method="post"
                action="/"
                onSubmit={handleFormSubmit}
              >
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    id="coupon"
                    name="coupon"
                    value={coupon.coupon}
                    onChange={handleCouponChange}
                  />
                  { isSuccess === true &&
                    <p className="form-input__message form-input__message--success">Промокод принят</p>}
                  {isSuccess === false &&
                  <p className="form-input__message form-input__message--error">неверный промокод</p>}
                </div>
                <button className="button button--big coupon__button">Применить</button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{`${totalPrice} ₽`}</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span>
                <span className="cart__total-value cart__total-value--bonus">
                  {discount === 0 ? '0 ₽' : `-${discountValue} ₽`}
                </span>
              </p>
              <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{`${totalPrice-discountValue} ₽`}</span></p>
              <button className="button button--red button--big cart__order-button" type='submit'>Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
      {!isDeleteFromCartModalHidden &&
      <RemoveScroll>
        <FocusLock>
          <DeleteFromCartModal
            data={removableGuitar}
            onSetIsDeleteFromCartModalHidden={setIsDeleteFromCartModalHidden}
          />
        </FocusLock>
      </RemoveScroll>}
    </main>
  );
}

export default Cart;
