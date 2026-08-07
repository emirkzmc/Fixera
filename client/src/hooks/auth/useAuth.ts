import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { authKeys } from '@/lib/query/keys/authKeys';

export function useGetMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authApi.getMe(),
  });
}
