import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/state';
import {
  addGuitarToCart,
  updateGuitarsIDInCart,
  deleteGuitarFromCart,
  updateTotalPrices,
  updateTotalQuantity,
  updateDiscount,
  setIsSuccessValue,
  setIsDeleteFromCartModalHidden} from '../action';

const initialState: CartData = {
  guitarsID: [],
  totalPrices: [],
  guitarsQuantity: [],
  discount: 0,
  isSuccess: null,
  isDeleteFromCartModalHidden: true,
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsID = [...state.guitarsID, action.payload];
      localStorage.setItem('guitarsIDInCart', JSON.stringify(state.guitarsID));
      localStorage.setItem(`${action.payload}`, JSON.stringify(1));
    })
    .addCase(updateGuitarsIDInCart, (state, action) => {
      state.guitarsID = action.payload;
    })
    .addCase(deleteGuitarFromCart, (state, action) => {
      state.guitarsID = state.guitarsID.filter((id) => id !== action.payload);
      state.totalPrices = [...state.totalPrices.filter((item) => item.id !== action.payload)];
      state.guitarsQuantity = [...state.guitarsQuantity.filter((item) => item.id !== action.payload)];
      localStorage.setItem('guitarsIDInCart', JSON.stringify(state.guitarsID));
    })
    .addCase(updateTotalPrices, (state, action) => {
      if (state.totalPrices.some((item) => item.id === action.payload.id)) {
        state.totalPrices = [...state.totalPrices.filter((item) => item.id !== action.payload.id), action.payload];
      } else {
        state.totalPrices = [...state.totalPrices, action.payload];
      }
    })
    .addCase(updateTotalQuantity, (state, action) => {
      if (state.guitarsQuantity.some((item) => item.id === action.payload.id)) {
        state.guitarsQuantity = [...state.guitarsQuantity.filter((item) => item.id !== action.payload.id), action.payload];
      } else {
        state.guitarsQuantity = [...state.guitarsQuantity, action.payload];
      }
    })
    .addCase(updateDiscount, (state, action) => {
      state.discount = action.payload;
      localStorage.setItem('discount', JSON.stringify(state.discount));
    })
    .addCase(setIsSuccessValue, (state, action) => {
      state.isSuccess = action.payload;
    })
    .addCase(setIsDeleteFromCartModalHidden, (state, action) => {
      state.isDeleteFromCartModalHidden = action.payload;
    });
});

export {cartData};
