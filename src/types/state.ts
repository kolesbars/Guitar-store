import { GuitarType, PricesType } from './guitar';
import { SearchFormParamsType, SortParamsType, FilterParamsType, PaginationParamsType } from './search-params';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[],
  similarGuitars: GuitarType[],
  isLoaded: boolean,
  prices: PricesType,
}

export type PageCount = {
  pageCount: string,
  totalCount: string,
}

export type SearchParams = {
  sortParams: SortParamsType,
  filterParams: FilterParamsType,
  searchFormParams: SearchFormParamsType,
  paginationParams: PaginationParamsType,
}

export type State = RootState;
