import { CurrentGuitarData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { emptyGuitar } from '../../const';
import { updateGuitarData, updateCurrentGuitarComments} from '../action';

const initialState: CurrentGuitarData = {
  guitarData: emptyGuitar,
  isLoaded: false,
  comments: [],
};

const currentGuitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGuitarData, (state, action) => {
      state.guitarData = action.payload;
    })
    .addCase(updateCurrentGuitarComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {currentGuitarData};
