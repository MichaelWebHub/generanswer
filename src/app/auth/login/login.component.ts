import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {LogInPending} from '../../_store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messagePreloader = false;
  message = '';

  constructor(private router: Router,
              private _store: Store<any>) {
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
}
