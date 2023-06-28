export interface JwtPayload extends Express.AuthInfo {
    iss: string;
    exp: number;
    iat: number;
    sub: number;
    uid: number;
    name: string;
    avatar: string;
}
