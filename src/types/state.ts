import { GuitarType } from './guitar';
import { SearchFormParamsType, SortParamsType, FilterParamsType, PaginationParamsType } from './search-params';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[]
}

export type PageCount = {
  pageCount: string
}

export type SearchParams = {
  sortParams: SortParamsType,
  filterParams: FilterParamsType,
  searchFormParams: SearchFormParamsType,
  paginationParams: PaginationParamsType,
}

export type State = RootState;
