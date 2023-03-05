export interface RegisterUserResponse {
  readonly user: RegisterUserData;
  readonly providerId: string;
  readonly _tokenResponse: RegisterUserTokenResponse;
  readonly operationType: string;
}

interface RegisterUserData {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly providerData: RegisterUserProviderData;
  readonly stsTokenMenager: RegisterUserTokenMenager;
  readonly createdAt: string;
  readonly lastLoginAt: string;
  readonly apiKey: string;
  readonly appName: string;
}

interface RegisterUserProviderData {
  readonly providerId: string;
  readonly uid: string;
  readonly displayName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly photoUrl: string;
}

interface RegisterUserTokenMenager {
  readonly refreshToken: string;
  readonly accessToken: string;
  readonly expirationTime: number;
}

interface RegisterUserTokenResponse {
  readonly kind: string;
  readonly idToken: string;
  readonly email: string;
  readonly refreshToken: string;
  readonly expiresIn: string;
  readonly localId: string;
}
