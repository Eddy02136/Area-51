export interface ApiToken {
    apiName: string;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
}