export interface LoginResponsePayload{
    authToken: string,
    refreshToken: string,
    expiresAt: Date,
    username: string,
    admin: boolean
  }
