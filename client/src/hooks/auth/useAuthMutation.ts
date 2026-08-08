import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { authApi } from '@/api/authApi';
import type { LoginRequest, RegisterRequest } from '@/domains/authDomains';
import { authKeys } from '@/lib/query/keys/authKeys';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      // Assuming data returns AuthResponse which has accessToken
      if (data && data.accessToken) {
        Cookies.set('authToken', data.accessToken, { expires: 7 }); // expires in 7 days
      }
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
}

export function useUpdateProfilePhotoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => authApi.updateProfilePhoto(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}
