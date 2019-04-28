import {Action, Store} from 'ngrx-actions/dist';
import {LogIn, LogInError, LogOut, SignUp} from '../actions/auth.actions';
import {IAuthStore} from '../interfaces/auth.interface';
import {Router} from '@angular/router';

@Store({
  collection: [],
  selections: {},
  loading: false,
  user: null,
  authenticated: false
})
export class AuthReducer {

  constructor(private _router: Router) {
  }

  @Action(SignUp)
  signUp(state: IAuthStore, action: SignUp) {
    state.authenticated = true;
    state.user = action.payload.user;
  }

  @Action(LogIn)
  logIn(state: IAuthStore, action: LogIn) {
    state.authenticated = true;
    state.user = action.payload.user;
  }

  @Action(LogOut)
  logOut(state: IAuthStore, action: LogOut) {
    localStorage.removeItem('token');
    state.authenticated = false;
    state.user = null;
  }

  @Action(LogInError)
  logInError(state: IAuthStore, action: LogInError) {
    state.message = action.payload;
  }
}

