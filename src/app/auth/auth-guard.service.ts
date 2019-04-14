import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {CheckTokenPending} from '../_store/actions/auth.actions';
import {Select} from 'ngrx-actions/dist';

@Injectable()
export class AuthGuard implements CanActivate {

  @Select('auth.authenticated')
  authenticated$: Observable<boolean>;

  constructor(private _store: Store<any>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._store.dispatch(new CheckTokenPending({token: localStorage.getItem('token')}));

    return this.authenticated$;
  }
}
