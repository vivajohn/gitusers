// Information about the user
export class User {
  constructor(
    public id: number,
    public login?: string,
    public avatar_url?: string,
  ) {}
}