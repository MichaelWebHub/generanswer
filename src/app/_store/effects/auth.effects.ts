import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ofAction} from 'ngrx-actions/dist';
import {CheckTokenPending, ConfirmEmail, LogIn, LogInError, LogInPending, LogOut, SignUpPending} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofAction(SignUpPending),
    map((action: SignUpPending) => {
      return action.payload;
    }),
    switchMap((authData: { email: string, password: string }) => {
      return this.http.post('/signup', authData)
        .pipe(
          map((response: any): any => {
            if (response.status) {
              localStorage.token = response.token;
              this.router.navigate(['dashboard']);
              return new LogIn({user: response.user, message: response.message});
            } else {
              return new LogInError(response.message);
            }
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofAction(LogInPending),
    map((action: LogInPending) => {
      return action.payload;
    }),
    switchMap((authData: { email: string, password: string }) => {
      return this.http.post('/login', authData)
        .pipe(
          map((response: any): any => {
            if (response.status) {
              localStorage.token = response.token;
              this.router.navigate(['dashboard']);
              return new LogIn({user: response.user, message: response.message});
            } else {
              return new LogInError(response.message);
            }
          })
        );
    })
  );

  @Effect({dispatch: false})
  confirmEmail = this.actions$.pipe(
    ofAction(ConfirmEmail),
    switchMap((token: ConfirmEmail) => {
      return this.http.get(`/confirm-email/${token.payload}`)
        .pipe(
          map(() => {
            this.router.navigate(['dashboard']);
          })
        );
    })
  );


  @Effect()
  authCheck = this.actions$.pipe(
    ofAction(CheckTokenPending),

    map((action: CheckTokenPending) => {
      return action.payload;
    }),
    switchMap((data: { token: string }) => {
      return this.checkToken(data.token)
        .pipe(
          map((result) => {
            if (result.status) {
              this.router.navigate(['dashboard']);
              return new LogIn({user: result.user, message: result.message});
            } else {
              this.router.navigate(['login']);
              return new LogInError(result.message);
            }
          })
        );
    })
  );

  constructor(private actions$: Actions,
              private router: Router,
              private http: HttpClient) {
  }

  checkToken(token): Observable<any> {
    return this.http.get('/check/' + token);
  }

}
