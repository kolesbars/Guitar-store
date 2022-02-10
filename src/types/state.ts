import { GuitarType, CommentType, PricesType, GuitarComment } from './guitar';
import { SearchFormParamsType, SortParamsType, FilterParamsType, PaginationParamsType } from './search-params';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[],
  similarGuitars: GuitarType[],
  isLoaded: boolean,
  prices: PricesType,
  commentsCounts: GuitarComment[]
}

export type CurrentGuitarData = {
  guitarData: GuitarType,
  isDataLoaded: boolean,
  isCommentsLoaded: boolean,
  isCommentSent: boolean,
  comments: CommentType[],
};

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
