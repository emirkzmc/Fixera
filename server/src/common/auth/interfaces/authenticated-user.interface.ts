export interface AuthenticatedUser {
  userId: string;
  email: string;
  tenantId: string; // which maps to workshop_id
}
