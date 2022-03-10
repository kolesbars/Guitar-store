import { GuitarType, CommentType, PricesType, GuitarComment } from './guitar';
import { SearchFormParamsType, SortParamsType, FilterParamsType, PaginationParamsType } from './search-params';
import { GuitarPricesType, QuantityType } from './cart';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[],
  similarGuitars: GuitarType[],
  isLoaded: boolean,
  prices: PricesType,
  comments: GuitarComment[]
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

export type CartData = {
  guitarsID: number[],
  totalPrices: GuitarPricesType[],
  guitarsQuantity: QuantityType[],
  discount: number,
  isSuccess: boolean | null,
  isDeleteFromCartModalHidden: boolean,
}

export type State = RootState;
