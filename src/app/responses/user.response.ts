export interface UserResponse {
  readonly user: UserData;
  readonly providerId: string;
  readonly _tokenResponse: UserTokenResponse;
  readonly operationType: string;
}

interface UserData {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly providerData: UserProviderData;
  readonly stsTokenMenager: UserTokenMenager;
  readonly createdAt: string;
  readonly lastLoginAt: string;
  readonly apiKey: string;
  readonly appName: string;
}

interface UserProviderData {
  readonly providerId: string;
  readonly uid: string;
  readonly displayName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly photoUrl: string;
}

interface UserTokenMenager {
  readonly refreshToken: string;
  readonly accessToken: string;
  readonly expirationTime: number;
}

interface UserTokenResponse {
  readonly kind: string;
  readonly idToken: string;
  readonly email: string;
  readonly refreshToken: string;
  readonly expiresIn: string;
  readonly localId: string;
}
