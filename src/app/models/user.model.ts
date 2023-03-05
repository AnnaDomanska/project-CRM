export interface UserModel {
  readonly iss: string;
  readonly aud: string;
  readonly auth_time: number;
  readonly user_id: string;
  readonly sub: string;
  readonly iat: number;
  readonly exp: number;
  readonly email: string;
  readonly email_verified: boolean;
  readonly firebase: UserFirebase;
  readonly uid: string;
}

interface UserFirebase {
  readonly identities: FirebaseIndentities;
  readonly sign_in_provider: string;
}

interface FirebaseIndentities {
  readonly email: string;
}
