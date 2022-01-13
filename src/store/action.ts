import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar';
import { SortParamsType, FilterParamsType, SearchFormParamsType, PaginationParamsType } from '../types/search-params';
import { createAction } from '@reduxjs/toolkit';

export const updateGuitarsList = createAction(
  ActionType.UpdateGuitarsList,
  (guitars: GuitarType[]) => ({
    payload: guitars,
  }),
);

export const updatePageCount = createAction(
  ActionType.UpdatePageCount,
  (pageCount: string ) => ({
    payload: pageCount,
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
