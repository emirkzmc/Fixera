import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import type { LoginRequest, RegisterRequest } from '@/domains/authDomains';
import { authKeys } from '@/lib/query/keys/authKeys';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: () => {
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
