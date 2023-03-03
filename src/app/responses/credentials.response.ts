export interface CredentialsResponse {
  readonly id: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly emailVerified: boolean;
}
