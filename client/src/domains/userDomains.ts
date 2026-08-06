export interface User {
  id: string;
  fullName: string;
  email: string;
  workshopId: string;
  profilePhoto?: string;
}

export interface UpdateUserProfilePhotoRequest {
  profilePhoto: string;
}
