import { createReducer } from '@reduxjs/toolkit';
import { CartData } from '../../types/state';
import {
  addGuitarToCart,
  updateGuitarsIDInCart,
  deleteGuitarFromCart,
  updateTotalPrices,
  updateTotalQuantity,
  updateDiscount,
  setIsSuccessValue} from '../action';

const initialState: CartData = {
  guitarsID: [],
  totalPrices: [],
  guitarsQuantity: [],
  discount: 0,
  isSuccess: null,
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsID = [...state.guitarsID, action.payload];
    })
    .addCase(updateGuitarsIDInCart, (state, action) => {
      state.guitarsID = action.payload;
    })
    .addCase(deleteGuitarFromCart, (state, action) => {
      state.guitarsID = state.guitarsID.filter((id) => id !== action.payload);
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
    })
    .addCase(setIsSuccessValue, (state, action) => {
      state.isSuccess = action.payload;
    });
});

export {cartData};
