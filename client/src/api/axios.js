import axios from "axios";
  const backendUrl = import.meta.env.VITE_API_URL;
//Axios interface to use it redux reducer............
const api = axios.create({
  baseURL: `${backendUrl}/api`, // apne backend ka baseURL
  withCredentials: true, // ✅ cookies bhejne ke liye
});

export default api;
