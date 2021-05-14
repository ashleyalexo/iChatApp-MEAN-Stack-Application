import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatRoomComponent } from './chat-dashboard/chat-room/chat-room.component';
import { AllContactsComponent } from './chat-dashboard/all-contacts/all-contacts.component';
import { MyContactsComponent } from './chat-dashboard/my-contacts/my-contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ChatDashboardComponent,
    ProfileComponent,
    ChatRoomComponent,
    AllContactsComponent,
    MyContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
