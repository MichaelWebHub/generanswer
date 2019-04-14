import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth-guard.service';
import {RoomsComponent} from './dashboard/rooms/rooms.component';
import {RoomDetailsComponent} from './dashboard/rooms/room-details/room-details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms'
      },
      {
        path: 'rooms',
        component: RoomsComponent
      },
      {
        path: 'rooms/:roomId',
        component: RoomDetailsComponent
      }
    ]
  }
  // {
  //   path: 'room/:roomID',
  //   component: RoomComponent,
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
