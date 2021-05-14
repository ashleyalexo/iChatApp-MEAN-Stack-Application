export class Chatmessage {
  constructor(
    public _id      : string,
    public msgfrom  : string,
    public msgto    : string,
    public message  : string,
    public image    : string,
    public isRead   : Boolean,
    public isFwd    : Boolean,
    public sendDate : Date
  ){}
}
