import axios from "axios";
import { AUTH_LOCAL_STORAGE_KEY, AuthModel } from "../types/auth";

export const getCurrentUserAPI = () => {
  const authLocal = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  const auth: AuthModel = JSON.parse(authLocal ?? '') as AuthModel

  return axios.get(`/auth/users/me/`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${auth.access_token}`,
    },
  });
}