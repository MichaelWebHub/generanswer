import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {CheckTokenPending} from '../_store/actions/auth.actions';
import {Select} from 'ngrx-actions/dist';
import {IStore} from '../_store/interfaces/store.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  @Select('auth.authenticated')
  authenticated$: Observable<boolean>;

  constructor(private _store: Store<IStore>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.authenticated$.subscribe((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this._store.dispatch(new CheckTokenPending({token: localStorage.getItem('token')}));
      }
    });

    return this.authenticated$;
  }
}
