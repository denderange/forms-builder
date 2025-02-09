export {};

export type Roles = 'admin' | 'moderator' | 'ordinary';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
