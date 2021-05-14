import { Component, OnInit } from '@angular/core';

import { User } from '../shared/user'

import { AuthService } from '../shared/auth.service'
import { SocketService } from '../shared/socket.service';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css']
})
export class ChatDashboardComponent implements OnInit {

  userList:any;

  user:User ={
    _id:'',
    username:'',
    email:'',
    password:'',
    imageUrl:'',
    contacts:[]
  }
  myContactList:Array<{uname:string,isBlocked:boolean,isMuted:boolean}> =[];
  activeUsers:any=[];

  userid = sessionStorage.getItem('user_id')
  username = sessionStorage.getItem('user_name');

  // sessionStorage.setItem('user_id',res.user._id);
  // sessionStorage.setItem('user_name',res.user.username);

  constructor(public _auth: AuthService, private socketService: SocketService) { }

  ngOnInit(): void {
    //call service to get loggedin user profile details
    // this._auth.getUserProfile(this.userid)
    // .subscribe((userdata)=>{
    //   this.user = JSON.parse(JSON.stringify(userdata));
    //   console.log(this.user);
    //   this.myContactList = this.user.contacts;
    //   console.log(this.myContactList);
    // })

    this._auth.getAllUsers()
    .subscribe(res =>{
      this.userList = res;
      console.log(this.userList);
      for(let i=0;i<this.userList.length;i++){
        if(this.userList[i].username == this.username){
          this.user = this.userList[i];
          console.log(this.user);
          break;
        }
      }
    },
    err =>{console.log(err)})

    //raise the socket loggedin event
    // this.socketService.eventEmits('loggedin',this.username);

    //get all loggedin users
    this.socketService.eventListens('activeUserUpdate')
    .subscribe((userlist)=>{
      this.activeUsers = JSON.parse(JSON.stringify(userlist));
      console.log(this.activeUsers);

      // this.socketService.eventListens('invite')
      // .subscribe((data)=>{
      //   this.socketService.eventEmits('joinRoom',data);
      // })
    })

    

  }

}
