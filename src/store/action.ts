import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar';
import { SearchParamsType } from '../types/search-params';
import { createAction } from '@reduxjs/toolkit';

export const updateGuitarsList = createAction(
  ActionType.UpdateGuitarsList,
  (guitars: GuitarType[]) => ({
    payload: guitars,
  }),
);

export const updateSearchParams = createAction(
  ActionType.UpdateSearchParams,
  (params: SearchParamsType) => ({
    payload: params,
  }),
);
