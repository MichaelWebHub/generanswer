import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth-guard.service';
import {RoomsComponent} from './dashboard/rooms/rooms.component';
import {RoomDetailsComponent} from './dashboard/rooms/room-details/room-details.component';
import {SettingsComponent} from './dashboard/rooms/room-details/settings/settings.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'rooms',
        component: RoomsComponent
      },
      {
        path: 'rooms/:roomId',
        component: RoomDetailsComponent
      },
      {
        path: 'rooms/:roomId/settings',
        component: SettingsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
