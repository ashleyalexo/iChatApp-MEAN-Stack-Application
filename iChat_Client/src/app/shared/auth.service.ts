import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = 'http://localhost:3000';

  //heroku hosted server url
  // readonly baseURL = 'https://ashley-lib-server.herokuapp.com';

  constructor(private http: HttpClient) { }

  signupUser(user:any){
    return this.http.post<any>(this.baseURL + '/user/register',user);
  }

  loginUser(user:any){
    return this.http.post<any>(this.baseURL + '/user/login',user)
  }

  //checks whether the token exists in localStorage
  isLoggedIn(){
    return !!sessionStorage.getItem('token');
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  getUserName(){
    return sessionStorage.getItem('user_name');
  }

  getUserProfile(id:any){
    return this.http.get(this.baseURL + `/user/myprofile/${id}`)
  }

  getAllUsers(){
    return this.http.get(this.baseURL + '/user/users')
  }
}
