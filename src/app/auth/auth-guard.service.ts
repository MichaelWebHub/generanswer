import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new CheckTokenPending({token: localStorage.getItem('token')}));
    //
    // return this.store.select('auth').pipe(
    //   skip(1),
    //   take(1),
    //   map((r: any) => {
    //     console.log(r);
    //     return r.authenticated;
    //   })
    // );

    return true;
  }
}
