import { PageCount} from '../../types/state';
import { updatePageCount, updateTotalCount } from '../action';
import { createReducer } from '@reduxjs/toolkit';

const initialState: PageCount = {
  pageCount: '1',
  totalCount: '',
};

const pageCount = createReducer(initialState, (builder) => {
  builder
    .addCase(updatePageCount, (state, action) => {
      state.pageCount = action.payload;
    })
    .addCase(updateTotalCount, (state, action) => {
      state.totalCount = action.payload;
    });
});

export {pageCount};
