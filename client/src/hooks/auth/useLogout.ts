import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    // Remove the authentication token
    Cookies.remove('authToken');
    
    // Clear all cached data in react-query
    queryClient.clear();

    // Redirect to the login page
    router.push('/login');
  };

  return { logout };
}
