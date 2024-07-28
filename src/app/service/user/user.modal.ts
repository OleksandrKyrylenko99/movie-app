export class User {
  constructor(
    public accountId: number,
    private _sessionToken: string,
    public name: string
  ) {}
  get token() {
    if (!this._sessionToken) {
      return null;
    }
    return this._sessionToken;
  }
}
