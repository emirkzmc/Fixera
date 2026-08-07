import apiClient from '../lib/apiClient';
import { AuthApiMethod } from '../constants/MethodNames';
import type { LoginRequest, RegisterRequest, AuthResponse, AuthUser } from '../domains/authDomains';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<any, AuthResponse>(AuthApiMethod.LOGIN, data),
  register: (data: RegisterRequest) => apiClient.post<any, AuthResponse>(AuthApiMethod.REGISTER, data),
  getMe: () => apiClient.get<any, AuthUser>(AuthApiMethod.GET_ME),
  updateProfilePhoto: (formData: FormData) => 
    apiClient.put<any, AuthUser>(AuthApiMethod.UPDATE_PROFILE_PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};
