import { BACKEND_URL, REQUEST_TIMEOUT, HttpCode, ErrorMessage} from '../const';
import { toast } from 'react-toastify';
import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;

      if (response && response.status >= HttpCode.ServerError) {
        toast.info(ErrorMessage.ServerError);
      }

      return Promise.reject(error);
    },
  );

  return api;
};
