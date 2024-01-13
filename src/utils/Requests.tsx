import axios from "axios";
import { store } from "../redux/store";
import { setStoreValues } from "../redux/userSlice";

const errorHandler = (error: any) => console.log(`Error: ${error}`);

const Requests = axios.create({
  baseURL: "http://localhost:5000/",
});

const refreshToken = async () => {
  const token = store.getState().user.refreshToken;
  await axios
    .post(
      "http://localhost:5000/testRef",
      { token: token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response?.data?.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        store.dispatch(
          setStoreValues({
            key: "user",
            value: { ...store.getState().user, token: response.data.token },
          })
        );
      }
    })
    .catch(errorHandler);
};

Requests.interceptors.request.use(
  async (config) => {
    if (store.getState().user.token) {
      config.headers.Authorization = `Bearer ${store.getState().user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Requests.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      const originalRequest = error.config;
      originalRequest._retry = true;
      await refreshToken();
      // const access_token = await axios.post('', {
      // 	refresh: localStorage.getItem('refreshToken'),
      // });
      // if (access_token?.status === 200) {
      // 	console.log(access_token?.data);
      // 	localStorage.setItem('token', access_token?.data);
      // 	originalRequest.headers.Authorization = access_token?.data;
      // }
      return Requests(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default Requests;
