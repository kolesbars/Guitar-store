import { updateFilterParams, updateSortParams, updateSearchFormParams } from '../action';
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
  sortParams: {},
  filterParams: {},
  searchFormParams: {},
};

const searchParams = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSortParams, (state, action) => {
      state.sortParams = action.payload;
    })
    .addCase(updateFilterParams, (state, action) => {
      state.filterParams = action.payload;
    })
    .addCase(updateSearchFormParams, (state, action) => {
      state.searchFormParams = action.payload;
    });
});

export {searchParams};
