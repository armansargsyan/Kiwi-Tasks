export class DecodeAccessTokenDto {
  constructor(
    public iat: string | number,
    public email: string,
    public id: number,
  ) {}
}
