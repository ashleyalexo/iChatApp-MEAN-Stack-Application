import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  errorMsg:String=null;
  successMsg:String=null;

  user = {user_name:'',user_email:'',user_password:'',user_cpassword:''};

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(){
    this.user = {user_name:'',user_email:'',user_password:'',user_cpassword:''};
  }

  signupUser(){
    this.submitted = true;
    this._auth.signupUser(this.user)
    .subscribe(
        res=>{
        if(res.success)
        {
          //Success
          this.successMsg = res.message + '....Redirecting to iChat Login';
          //navigate to login
          setTimeout(()=>{
              this._router.navigate(['login']);
            },1000);
        }
        else{
        //Error
        this.errorMsg =res.message;
        this.resetForm();
        }
    })
    this.errorMsg=null;
  }

}
