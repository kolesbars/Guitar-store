
import { cartData } from './cart-data';
import {
  addGuitarToCart,
  updateGuitarsIDInCart,
  deleteGuitarFromCart,
  updateTotalPrices,
  updateTotalQuantity,
  updateDiscount,
  setIsSuccessValue,
  setIsDeleteFromCartModalHidden} from '../action';

describe('Reducer: currentGuitarData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(cartData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarsID: [],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should add guitar to cart', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = 1;

    expect(cartData(state, addGuitarToCart(data)))
      .toEqual({
        guitarsID: [1],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should update guitars in cart', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = [1,2];

    expect(cartData(state, updateGuitarsIDInCart(data)))
      .toEqual({
        guitarsID: [1,2],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should delete guitar from cart', () => {
    const state = {
      guitarsID: [1,2],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = 1;

    expect(cartData(state, deleteGuitarFromCart(data)))
      .toEqual({
        guitarsID: [2],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should update total prices', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = {
      id: 1,
      price: 1000,
    };

    expect(cartData(state, updateTotalPrices(data)))
      .toEqual({
        guitarsID: [],
        totalPrices: [{
          id: 1,
          price: 1000,
        }],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should update total quantity', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = {
      id: 1,
      quantity: 5,
    };

    expect(cartData(state, updateTotalQuantity(data)))
      .toEqual({
        guitarsID: [],
        totalPrices: [],
        guitarsQuantity: [{
          id: 1,
          quantity: 5,
        }],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should update discount', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = 15;

    expect(cartData(state, updateDiscount(data)))
      .toEqual({
        guitarsID: [],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 15,
        isSuccess: null,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should set coupon application status value', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = false;

    expect(cartData(state, setIsSuccessValue(data)))
      .toEqual({
        guitarsID: [],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: false,
        isDeleteFromCartModalHidden: true,
      });
  });

  it('should set deleted modal hidden status value', () => {
    const state = {
      guitarsID: [],
      totalPrices: [],
      guitarsQuantity: [],
      discount: 0,
      isSuccess: null,
      isDeleteFromCartModalHidden: true,
    };

    const data = false;

    expect(cartData(state, setIsDeleteFromCartModalHidden(data)))
      .toEqual({
        guitarsID: [],
        totalPrices: [],
        guitarsQuantity: [],
        discount: 0,
        isSuccess: null,
        isDeleteFromCartModalHidden: false,
      });
  });
});
