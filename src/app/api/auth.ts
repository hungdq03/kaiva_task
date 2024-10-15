import axios from "axios";
import { AUTH_LOCAL_STORAGE_KEY, AuthModel } from "../types/auth";

export const loginAPI = (username: string, password: string) => {
  return axios.post(`/auth/token`, new URLSearchParams({
    client_id: 'string',
    grant_type: 'password',
    client_secret: 'string',
    username: username,
    password: password,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
    }
  });
}

export const logoutAPI = () => {
  const authLocal = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  const auth: AuthModel = JSON.parse(authLocal ?? '') as AuthModel

  return axios.post(`/auth/logout/`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${auth.access_token}`,
    },
  });
}

export const registerAPI = (
  username: string,
  email: string,
  full_name: string,
  password: string
) => {
  return axios.post('/auth/register', {
    username,
    email,
    full_name,
    password
  })
}