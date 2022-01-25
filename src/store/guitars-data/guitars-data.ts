import { GuitarsData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import {
  updateGuitarsList,
  setLoadedStatusFalse,
  updateSimilarGuitarsList,
  updateGuitarsPrices,
  updateGuitarsComents
} from '../action';

const initialState: GuitarsData = {
  guitarsList: [],
  similarGuitars: [],
  isLoaded: false,
  commentsCounts: [],
  prices: {
    min: '',
    max: '',
  },
};

const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGuitarsList, (state, action) => {
      state.guitarsList = action.payload;
      state.isLoaded = true;
    })
    .addCase(setLoadedStatusFalse, (state, action) => {
      state.isLoaded = false;
    })
    .addCase(updateSimilarGuitarsList, (state, action) => {
      state.similarGuitars = action.payload;
    })
    .addCase(updateGuitarsPrices, (state, action) => {
      state.prices = action.payload;
    })
    .addCase(updateGuitarsComents, (state, action) => {
      state.commentsCounts = [...state.commentsCounts, action.payload];
    });
});

export {guitarsData};
