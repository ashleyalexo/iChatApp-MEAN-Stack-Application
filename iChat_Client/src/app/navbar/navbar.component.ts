import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, public _auth:AuthService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    localStorage.clear();
    this._router.navigate(['home']);
  }
}
