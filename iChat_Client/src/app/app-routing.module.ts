import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllContactsComponent } from './chat-dashboard/all-contacts/all-contacts.component';
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { ChatRoomComponent } from './chat-dashboard/chat-room/chat-room.component';
import { MyContactsComponent } from './chat-dashboard/my-contacts/my-contacts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'profile' , component: ProfileComponent
  },
  {
    path:'chat' , component: ChatDashboardComponent,
    children:[
      {path:'' , redirectTo:'mycontacts', pathMatch:'full'},
      {path:'mycontacts' , component: MyContactsComponent},
      {path:'contacts' , component: AllContactsComponent},
      {path:':chatwith' , component: ChatRoomComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
