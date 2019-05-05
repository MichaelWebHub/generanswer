import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {LogInPending} from '../../_store/actions/auth.actions';
import {IStore} from '../../_store/interfaces/store.interface';
import {Select} from 'ngrx-actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messagePreloader = false;

  @Select('auth.message')
  message$: Observable<string>;

  constructor(private router: Router,
              private _store: Store<IStore>) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.router.navigate(['signup']);
  }

  onLogin(form): void {
    this.messagePreloader = true;

    this._store.dispatch(new LogInPending(form.value));
  }

  forgotPassword(): void {
    this.router.navigate(['forgot-password']);
  }
}
