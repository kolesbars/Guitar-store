import { GuitarType } from './guitar';
import { SearchFormParamsType, SortParamsType, FilterParamsType } from './search-params';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[]
}

export type SearchParams = {
  sortParams: SortParamsType,
  filterParams: FilterParamsType,
  searchFormParams: SearchFormParamsType,
}

export type State = RootState;
