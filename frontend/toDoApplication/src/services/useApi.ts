import { useEffect, useState } from "react";
import axiosInstance from "./config";

export enum AXIOS_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  message: string;
}

function doApiCall<T>(
  method: AXIOS_METHOD,
  uri: string,
  onSuccess: (data: T) => void,
  onFailure: (error: ApiError) => void,
  data?: any
) {
  axiosInstance({
    method,
    url: uri,
    data,
  })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      console.log(err);
      if (onFailure) {
        onFailure({
          message: err?.response?.data?.message || "An error occurred",
        });
      }
    });
}

export function useApi<T>(
  method: AXIOS_METHOD,
  uri: string,
  postData?: any,
  deps: any[] = []
): [T | null, boolean, ApiError | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    setLoading(true);
    doApiCall<T>(
      method,
      uri,
      (responseData: T) => {
        setData(responseData);
        setError(null);
        setLoading(false);
      },
      (errorMessage: ApiError) => {
        setData(null);
        setError(errorMessage);
        setLoading(false);
      },
      postData
    );
  }, [method, uri, JSON.stringify(postData), ...deps]);

  return [data, loading, error];
}
