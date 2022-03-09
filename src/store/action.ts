import { ActionType } from '../types/action';
import { GuitarType, CommentType, PricesType, GuitarComment } from '../types/guitar';
import { GuitarPricesType, QuantityType } from '../types/cart';
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

export const updateGuitarData = createAction(
  ActionType.UpdateGuitarData,
  (guitarData: GuitarType) => ({
    payload: guitarData,
  }),
);

export const updateCurrentGuitarComments = createAction(
  ActionType.UpdateCurrentGuitarComments,
  (comments: CommentType[]) => ({
    payload: comments,
  }),
);

export const addNewGuitarComment = createAction(
  ActionType.AddNewGuitarComment,
  (comment: CommentType) => ({
    payload: comment,
  }),
);

export const setCommentSendigStatusFalse = createAction(ActionType.SetCommentSendingStatusFalse);

export const updateGuitarsPrices = createAction(
  ActionType.UpdateGuitarsPrices,
  (prices: PricesType) => ({
    payload: prices,
  }),
);

export const updateGuitarsComents = createAction(
  ActionType.UpdateGuitarsComments,
  (commentsCounts: GuitarComment) => ({
    payload: commentsCounts,
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

export const addGuitarToCart = createAction(
  ActionType.AddGuitarToCart,
  (id: number) => ({
    payload: id,
  }),
);

export const updateGuitarsIDInCart = createAction(
  ActionType.UpdateGuitarsIDInCart,
  (id: number[]) => ({
    payload: id,
  }),
);

export const deleteGuitarFromCart = createAction(
  ActionType.DeleteGuitarFromCart,
  (id: number) => ({
    payload: id,
  }),
);

export const updateTotalPrices = createAction(
  ActionType.UpdateTotalPrices,
  (totalPrice: GuitarPricesType) => ({
    payload: totalPrice,
  }),
);

export const updateTotalQuantity = createAction(
  ActionType.UpdateTotalQuantity,
  (quantity: QuantityType) => ({
    payload: quantity,
  }),
);

export const updateDiscount = createAction(
  ActionType.UpdateDiscount,
  (discount: number) => ({
    payload: discount,
  }),
);

export const setIsSuccessValue = createAction(
  ActionType.SetIsSuccessValue,
  (value: boolean | null) => ({
    payload: value,
  }),
);
