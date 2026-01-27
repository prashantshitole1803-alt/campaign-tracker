// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://campaign-tracker-1-hm6d.onrender.com/api/",
// });

import axios from "axios";

const api = axios.create({
  baseURL: "https://campaign-tracker-1-hm6d.onrender.com/api/",
  timeout: 5000,  // optional: timeout for requests
});

export default api;
