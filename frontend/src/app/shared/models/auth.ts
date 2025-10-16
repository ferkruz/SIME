export interface LoginResponse {
  mfaRequired: boolean;
  userId?: string;
  token?: string;
}