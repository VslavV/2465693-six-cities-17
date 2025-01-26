import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { toast } from 'react-toastify';

type MessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number,boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<MessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailErrorMessage = (error.response.data);
        toast.warn(detailErrorMessage.message);
      }

      throw error;
    }
  );

  return api;
};
export {createAPI};
