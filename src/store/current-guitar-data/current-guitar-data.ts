import { CurrentGuitarData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { emptyGuitar } from '../../const';
import { updateGuitarData, updateCurrentGuitarComments, addNewGuitarComment} from '../action';

const initialState: CurrentGuitarData = {
  guitarData: emptyGuitar,
  isDataLoaded: false,
  isCommentsLoaded: false,
  isCommentSent: false,
  comments: [],
};

const currentGuitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGuitarData, (state, action) => {
      state.guitarData = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(updateCurrentGuitarComments, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    })
    .addCase(addNewGuitarComment, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.isCommentSent = true;
    });
});

export {currentGuitarData};
