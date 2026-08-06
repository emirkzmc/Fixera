export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  email: string;
  password?: string;
  fullName: string;
  workshopName: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  workshopId: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
