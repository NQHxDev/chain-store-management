export type RefreshResult = {
   tokens: TokenPair;
   user: {
      id: number;
      username: string;
      email: string;
      role: string;
   };
};

export interface TokenPayload {
   userId: string | number;
   username: string;
   email: string;
   role: string;
   sessionId?: string;
}

export interface TokenPair {
   accessToken: string;
   refreshToken: string;
   expiresIn: number;
   sessionId: string;
}

export interface StoredRefreshToken {
   tokenHash: string;
   userId: string | number;
   sessionId: string;
   deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
   ipAddress: string;
   userAgent: string;
   deviceType?: string;
   browser?: string;
   os?: string;
   sessionId: string;
}

export interface TokenValidationResult {
   isValid: boolean;
   payload?: TokenPayload;
   error?: string;
}
