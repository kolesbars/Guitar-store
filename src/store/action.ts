import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar';
import { createAction } from '@reduxjs/toolkit';

export const updateGuitarsList = createAction(
  ActionType.UpdateGuitarsList,
  (guitars: GuitarType[]) => ({
    payload: guitars,
  }),
);
