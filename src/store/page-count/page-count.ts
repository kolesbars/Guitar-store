import { PageCount} from '../../types/state';
import { updatePageCount } from '../action';
import { createReducer } from '@reduxjs/toolkit';

const initialState: PageCount = {
  pageCount: '1',
};

const pageCount = createReducer(initialState, (builder) => {
  builder
    .addCase(updatePageCount, (state, action) => {
      state.pageCount = action.payload;
    });
});

export {pageCount};
