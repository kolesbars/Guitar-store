import { toast } from 'react-toastify';
import { APIRoute, ErrorMessage } from '../const';
import { GuitarType } from '../types/guitar';
import {ThunkActionResult} from '../types/action';
import {
  updateGuitarsList,
  updateTotalCount,
  setLoadedStatusFalse,
  updateSimilarGuitarsList,
  updateGuitarsPrices
} from './action';

export const loadGuitarList = (searchParams: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setLoadedStatusFalse());
    try {
      const response = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams}`);
      dispatch(updateGuitarsList(response.data));
      dispatch(updateTotalCount(response.headers['x-total-count']));
    } catch {
      toast.info(ErrorMessage.FailLoading);
    }
  };

export const loadSimilarGuitars = (searchValue: string) :ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} =  await api.get<GuitarType[]>(`${APIRoute.Guitars}?name_like=${searchValue}`);
      dispatch(updateSimilarGuitarsList(data));
    } catch {
      Error(ErrorMessage.FailLoading);
    }
  };

export const loadMaxMinPrices = () :ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarType[]>(APIRoute.Guitars);
      dispatch(updateGuitarsPrices({
        min: Math.min(...data.map((guitar) => guitar.price)).toString(),
        max: Math.max(...data.map((guitar) => guitar.price)).toString(),
      }));
    } catch {
      Error (ErrorMessage.FailLoading);
    }
  };
