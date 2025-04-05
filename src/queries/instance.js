import axios from "axios";


const createInstance = (token) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export default createInstance;
