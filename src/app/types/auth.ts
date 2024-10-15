
export interface AuthModel {
  access_token: string
  token_type: string
  expires: string
}

export const AUTH_LOCAL_STORAGE_KEY = 'auth'