import axios from "axios";

const http = axios.create({
  baseURL:
      (window as any).__gatewayURL__ || 'http://localhost:8000/api',
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the AUTH token for any request
http.interceptors.request.use(function (config) {
  let authHeader: string;
  const token: string | null = sessionStorage.getItem("token");

  if (!!token) {
    authHeader = token;
  }
  // @ts-ignore
  config.headers.Authorization = !!authHeader ? authHeader : "";
  return config;
});

const httpAuth = axios.create({
  baseURL: (window as any).__authURL__ || 'http://localhost:4200',
  headers: {
    "Content-Type": "application/json",
  'Content-Security-Policy': "*",
  },
});

// Set the AUTH token for any request
httpAuth.interceptors.response.use(function (response) {
  const token = response.headers['x-auth-token'];

  if (!!token) {
    sessionStorage.setItem('token', token);
  }
  return response;
});
export default http;
export {
  httpAuth
}
