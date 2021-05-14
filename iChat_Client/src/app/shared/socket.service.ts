import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io}  from 'socket.io-client/build/index';

// import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket:any;

  user=sessionStorage.getItem('user_name');
  server_url='http://localhost:3000';

  constructor() {
    // this.socket = io(this._url+this.user,{ transports: ['websocket', 'polling', 'flashsocket'] });

    this.initSocket();
  }

  // setupSocketConnection
  initSocket(){
    this.socket = io(this.server_url,{ query: { "username" : this.user } });
  }

  eventListens(eventName:string){
    return new Observable((observer) =>
    {
      this.socket.on(eventName,(data:any) => {
        observer.next(data);
      })
    });
  }

  eventEmits(eventName:string,data:any){
    this.socket.emit(eventName,data);
  }
}
