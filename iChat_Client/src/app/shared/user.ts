export class User {
  constructor(
    public _id      : string,
    public username : string,
    public email    : string,
    public password : string,
    public imageUrl : string,
    public contacts : Array<{uname:string,isMuted:boolean,isBlocked:boolean}>
  ){}
}
