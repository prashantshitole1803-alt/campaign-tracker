// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://campaign-tracker-1-hm6d.onrender.com/api/",
// });

import axios from "axios";

const api = axios.create({
  baseURL: "https://campaign-tracker-1-hm6d.onrender.com/api/",
  timeout: 10000,
});

export default api;
