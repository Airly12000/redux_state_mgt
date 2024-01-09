import axios from "axios";
import { store } from "../redux/store";
import { setStoreValues } from "../redux/userSlice";

const errorHandler = (error: any) => console.log(`Error: ${error}`);

const Requests = axios.create({
  baseURL: "http://localhost:5000/",
});

const refreshToken = async () => {
  const token = store.getState().user.refreshToken;
  await Requests.post("testRef", { token: token })
    .then((response) => {
      if (response?.data?.token) {
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

Requests.interceptors.response.use(undefined, (err) => {
  const { config, message, response } = err;
  // console.log("=======", config?.url);
  // console.log("=======", response?.data, response?.status);
  if (response?.status === 401) {
    refreshToken();
  }

  if (response?.data?.errors) {
    return Promise.reject(response?.data?.errors?.[0]?.msg);
  }

  if (response?.data) {
    return Promise.reject(response?.data);
  }

  if (!(message.includes("timeout") || message.includes("Network Error"))) {
    return Promise.reject(err);
  }

  return Promise.resolve(response);
});

export default Requests;
