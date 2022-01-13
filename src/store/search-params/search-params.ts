import { updateFilterParams, updateSortParams, updateSearchFormParams, updatePaginationParams } from '../action';
import { SearchParams } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: SearchParams = {
  sortParams: {},
  filterParams: {},
  searchFormParams: {},
  paginationParams: {},
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
    })
    .addCase(updatePaginationParams, (state, action) => {
      state.paginationParams = action.payload;
    });
});

export {searchParams};
