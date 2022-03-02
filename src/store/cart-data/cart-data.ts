import { createReducer } from '@reduxjs/toolkit';
import { addGuitarToCart, deleteGuitarFromCart} from '../action';
import { CartData } from '../../types/state';

const initialState: CartData = {
  guitarsID: [],
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsID = [...state.guitarsID, action.payload];
    })
    .addCase(deleteGuitarFromCart, (state, action) => {
      state.guitarsID = state.guitarsID.filter((id) => id !== action.payload);
    });
});

export {cartData};
