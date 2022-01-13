import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import {
  SearchFormParamsType,
  SortParamsType,
  FilterParamsType,
  PaginationParamsType
} from '../../types/search-params';

export const getSortParams = (state: State): SortParamsType =>
  state[NameSpace.params].sortParams;

export const getFilterParams = (state: State): FilterParamsType =>
  state[NameSpace.params].filterParams;

export const getSearchFormParams = (state: State): SearchFormParamsType =>
  state[NameSpace.params].searchFormParams;

export const getPaginationParams = (state: State): PaginationParamsType =>
  state[NameSpace.params].paginationParams;
