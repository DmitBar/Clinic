import React from 'react';
import axios, { type InternalAxiosRequestConfig, type AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { localStorageManager } from './localStorageManager';

interface errorDataType {
  message: string;
  errors: any[];
}

export const baseURL = 'https://localhost:7206/';

const _axios = axios.create({
  baseURL,
});

_axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const token = localStorageManager.getItem('token') ?? '';

  const _config: any = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  };

  return _config;
});

_axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    toast.dismiss();

    if (!error.response) {
      toast.error(error.message);
      return;
    }

    if (error.response) {
      const message = error.response?.data
        ? // @ts-ignore
          error.response.data.message
        : error.message;
      const { status } = error.response;

      if (
        error.request.responseType === 'blob' &&
        error.response.data instanceof Blob &&
        error.response.data.type &&
        error.response.data.type.toLowerCase().includes('json')
      ) {
        await handleBlobError(error.response.data);
        return;
      }

      if (status >= 500) {
        toast.error(message === 'Server Error' ? 'whoops' : message);
        return;
      }

      handleBadRequestErrors(status, message, error);
    }

    return await Promise.reject(error);
  }
);

const handleBadRequestErrors = (
  status: number,
  message: string,
  error: AxiosError
): void => {
  if (status === 401) {
    if (message === 'Unauthenticated.') {
      // Handle Session Timeouts
      toast.info('Session Timeout');
    } else {
      // and incorrect login data
      toast.error(message || 'access_denied');
    }
  } else if (status === 403) {
    // Handle Forbidden
    toast.error(message || 'access_denied');
  } else if (status === 404) {
    // Handle Not Found
    toast.error(message || 'not_found');
  } else if (status === 422) {
    // Handle validation error
    const message = generateValidationErrorMessage(error);
    toast.error(message);
  } else {
    toast.error(message ?? 'whoops');
  }
};

export const handleBlobError = async (resBlob: any): Promise<void> => {
  const resText: any = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('abort', reject);
    reader.addEventListener('error', reject);
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.readAsText(resBlob);
  });

  const resData = JSON.parse(resText);
  toast.error(resData.message);
};

export const generateValidationErrorMessage = (
  error: AxiosError
): JSX.Element | string => {
  const errorData = error.response?.data as errorDataType;

  if (errorData?.errors) {
    // const header = errorData.message;
    const body = Object.keys(errorData.errors).map((key: any) => (
      <li key={key}>{errorData.errors[key][0]}</li>
    ));

    return (
      <div>
        {/* <h4>{header}</h4> */}
        <ul>{body}</ul>
      </div>
    );
  } else {
    return 'The given data was invalid.';
  }
};

export default _axios;
