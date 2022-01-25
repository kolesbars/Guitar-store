import { toast } from 'react-toastify';
import { APIRoute, ErrorMessage } from '../const';
import { GuitarType } from '../types/guitar';
import {ThunkActionResult} from '../types/action';
import {
  updateGuitarsList,
  updateTotalCount,
  setLoadedStatusFalse,
  updateSimilarGuitarsList,
  updateGuitarsPrices,
  updateGuitarsComents
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
