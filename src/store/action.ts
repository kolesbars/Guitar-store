import { ActionType } from '../types/action';
import { GuitarType, PricesType } from '../types/guitar';
import { createAction } from '@reduxjs/toolkit';
import {
  SortParamsType,
  FilterParamsType,
  SearchFormParamsType,
  PaginationParamsType
} from '../types/search-params';

export const updateGuitarsList = createAction(
  ActionType.UpdateGuitarsList,
  (guitars: GuitarType[]) => ({
    payload: guitars,
  }),
);

export const updateGuitarsPrices = createAction(
  ActionType.UpdateGuitarsPrices,
  (prices: PricesType) => ({
    payload: prices,
  }),
);

export const setLoadedStatusFalse = createAction(ActionType.SetLoadedStatusFalse);

export const updateSimilarGuitarsList = createAction(
  ActionType.UpdateSimilarGuitarsList,
  (similarGuitars: GuitarType[]) => ({
    payload: similarGuitars,
  }),
);

export const updatePageCount = createAction(
  ActionType.UpdatePageCount,
  (pageCount: string ) => ({
    payload: pageCount,
  }),
);

export const updateTotalCount = createAction(
  ActionType.UpdateTotalCount,
  (totalCount: string ) => ({
    payload: totalCount,
  }),
);

export const updateSortParams = createAction(
  ActionType.UpdateSortParams,
  (params: SortParamsType) => ({
    payload: params,
  }),
);

export const updateFilterParams = createAction(
  ActionType.UpdateFilterParams,
  (params: FilterParamsType) => ({
    payload: params,
  }),
);

export const updateSearchFormParams = createAction(
  ActionType.UpdateSearchFormParams,
  (params: SearchFormParamsType) => ({
    payload: params,
  }),
);

export const updatePaginationParams = createAction(
  ActionType.UpdatePaginationParams,
  (params: PaginationParamsType) => ({
    payload: params,
  }),
);
