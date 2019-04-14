import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './_services/http.interceptor';
import {environment} from '../environments/environment';
import {AuthGuard} from './auth/auth-guard.service';
import {FormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import {NgrxActionsModule} from 'ngrx-actions/dist';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './_store/effects/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthReducer} from './_store/reducers/auth.reducer';
import {HeaderComponent} from './header/header.component';
import {RoomsComponent} from './dashboard/rooms/rooms.component';
import {RoomDetailsComponent} from './dashboard/rooms/room-details/room-details.component';
import {RoomsEffects} from './_store/effects/rooms.effects';
import {RoomsReducer} from './_store/reducers/rooms.reducer';
import { AnswersComponent } from './dashboard/rooms/room-details/answers/answers.component';
import { ResultComponent } from './dashboard/rooms/room-details/result/result.component';
import { SettingsComponent } from './dashboard/rooms/room-details/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    RoomsComponent,
    RoomDetailsComponent,
    AnswersComponent,
    ResultComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    StoreModule.forRoot({}),
    NgrxActionsModule.forRoot({
      auth: AuthReducer,
      rooms: RoomsReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      RoomsEffects
    ]),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    FormsModule,
    AuthModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: 'BASE_URL',
      useValue: environment.baseUrl
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
