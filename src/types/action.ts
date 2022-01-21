import { State } from './state';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import {ThunkAction} from 'redux-thunk';

export enum ActionType {
  UpdateGuitarsList = 'guitars/updateGuitarsList',
  UpdateGuitarsPrices = 'guitars/updateGuitarsPrices',
  UpdateSimilarGuitarsList = 'guitars/updateSimilarGuitarsList',
  SetLoadedStatusFalse = 'guitars/setLoadedStatusFalse',
  UpdatePageCount = 'page/updatePageCount',
  UpdateTotalCount = 'page/updateTotalCount',
  UpdateSortParams = 'params/updateSortParams',
  UpdateFilterParams = 'params/updateFilterParams',
  UpdateSearchFormParams = 'params/updateSearchFormParams',
  UpdatePaginationParams = 'params/updatePaginationParams',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
