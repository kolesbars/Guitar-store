import { updateSearchParams } from '../action';
import { SearchParams } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

// const emptyParams = {
//   'type': [''],
//   'stringCount': [''],
//   'price_gte': '',
//   'price_lte': '',
//   '_sort': '',
//   '_order': '',
//   'name_like': '',
// };

const initialState: SearchParams = {
  params: {},
};

const searchParams = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSearchParams, (state, action) => {
      state.params = action.payload;
    });
});

export {searchParams};
