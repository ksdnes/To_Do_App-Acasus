import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "http://localhost:8080/";
export const TOKEN_NAME = "authorization";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true, // Ensure Axios sends cookies
});

export const saveToken = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("Error in saveToken", error);
    throw error;
  }
};

export const getToken = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error in getToken", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const token = await getToken(TOKEN_NAME);
    if (token) {
      req.headers.Authorization = token;
    }
    return req;
  } catch (error) {
    console.log("Error in request interceptor", error);
    return req;
  }
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
