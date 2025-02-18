import { toast } from 'react-toastify';
import { APIRoute, ErrorMessage } from '../const';
import { GuitarType, CommentType, CommentPostType } from '../types/guitar';
import {ThunkActionResult} from '../types/action';
import { CouponPostType } from '../types/cart';
import {
  updateGuitarsList,
  updateGuitarData,
  updateCurrentGuitarComments,
  addNewGuitarComment,
  setCommentSendigStatusFalse,
  updateTotalCount,
  setLoadedStatusFalse,
  updateSimilarGuitarsList,
  updateGuitarsPrices,
  updateGuitarsComents,
  updateDiscount,
  setIsSuccessValue
} from './action';

export const loadGuitarList = (searchParams: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setLoadedStatusFalse());
    await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams}`)
      .then((response) => {
        dispatch(updateGuitarsList(response.data));
        dispatch(updateTotalCount(response.headers['x-total-count']));
      }).catch((err) => {
        toast.info(ErrorMessage.FailLoading);
      });
  };

export const loadGuitarData = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<GuitarType>(`${APIRoute.Guitars}/${id}`)
      .then((response) => {
        dispatch(updateGuitarData(response.data));
      }).catch((err) => {
        toast.info(ErrorMessage.FailLoading);
      });
  };

export const loadCurrentGuitarComments = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<CommentType[]>(`${APIRoute.Guitars}/${id}/comments`)
      .then((response) => {
        dispatch(updateCurrentGuitarComments(response.data));
      }).catch((err) => {
        toast.info(ErrorMessage.FailLoading);
      });
  };

export const addGuitarComment = (data: CommentPostType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCommentSendigStatusFalse());
    await api.post<CommentType>(APIRoute.Comments, data)
      .then((response) => {
        dispatch(addNewGuitarComment(response.data));
      }).catch((err) => {
        toast.info(ErrorMessage.FailLoading);
      });
  };

export const loadSimilarGuitars = (searchValue: string) :ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<GuitarType[]>(`${APIRoute.Guitars}?name_like=${searchValue}`)
      .then((response) => {
        dispatch(updateSimilarGuitarsList(response.data));
      }).catch((err) => {
        throw new Error(err);
      });
  };

export const loadMaxMinPrices = () :ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<GuitarType[]>(APIRoute.Guitars).then((response) => {
      dispatch(updateGuitarsPrices({
        min: Math.min(...response.data.map((guitar) => guitar.price)).toString(),
        max: Math.max(...response.data.map((guitar) => guitar.price)).toString(),
      }));
    }).catch((err) => {
      throw new Error(err);
    });
  };

export const loadGuitarComments = (id: number):ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}/${id}/comments`);
      dispatch(updateGuitarsComents({
        id: id,
        count: data.length,
      }));
    } catch {
      Error(ErrorMessage.FailLoading);
    }
  };

export const applyCoupon = (coupon: CouponPostType):ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsSuccessValue(null));
    try{
      const {data} = await api.post<number>(APIRoute.Coupons, coupon);
      dispatch(updateDiscount(data));
      dispatch(setIsSuccessValue(true));
    } catch {
      dispatch(setIsSuccessValue(false));
    }
  };

