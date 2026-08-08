import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function makeQueryClient() {
  return new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        toast.error(error.message || 'Bir hata oluştu');
      },
    }),
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(error.message || 'Veri yüklenirken hata oluştu');
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
