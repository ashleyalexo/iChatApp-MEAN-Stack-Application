import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg:String;
  successMsg:String;

  user = {user_email:'',user_password:''};

  constructor(private _auth:AuthService,
    private _router : Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(){
    this.user = {user_email:'',user_password:''};
  }

  loginUser(){
    this._auth.loginUser(this.user)
    .subscribe(
    res =>{
    if(res.success){
      sessionStorage.setItem('token',res.token);
      sessionStorage.setItem('user_id',res.user._id);
      sessionStorage.setItem('user_name',res.user.username);
      console.log(sessionStorage.getItem('user_name'));
      console.log(res.user);
      //Success
      this.successMsg = res.message +'...Redirecting to your iChat Dashboard';
      //navigate to quiz
      setTimeout(()=>{
        this._router.navigate(['chat']);
      },1000)
    }
    else{
      //Error
      this.errorMsg = res.message;
      this.resetForm();
    }
    });
    this.errorMsg=null
  }

}
