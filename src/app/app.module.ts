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
import {ResultComponent} from './dashboard/rooms/room-details/result/result.component';
import {SettingsComponent} from './dashboard/rooms/room-details/settings/settings.component';
import {OptionsComponent} from './dashboard/rooms/room-details/options/options.component';
import {SettingsEffects} from './_store/effects/settings.effects';
import {SettingsReducer} from './_store/reducers/settings.reducer';
import {OptionsReducer} from './_store/reducers/options.reducer';
import {OptionsEffects} from './_store/effects/options.effects';
import { RoomSettingsComponent } from './dashboard/rooms/room-details/settings/room-settings/room-settings.component';
import { OptionsSettingsComponent } from './dashboard/rooms/room-details/settings/options-settings/options-settings.component';
import { ConfigSettingsComponent } from './dashboard/rooms/room-details/settings/config-settings/config-settings.component';
import { ConfirmEmailComponent } from './auth/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    RoomsComponent,
    RoomDetailsComponent,
    ResultComponent,
    SettingsComponent,
    OptionsComponent,
    RoomSettingsComponent,
    OptionsSettingsComponent,
    ConfigSettingsComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    StoreModule.forRoot({}),
    NgrxActionsModule.forRoot({
      auth: AuthReducer,
      rooms: RoomsReducer,
      settings: SettingsReducer,
      options: OptionsReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      RoomsEffects,
      SettingsEffects,
      OptionsEffects
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
