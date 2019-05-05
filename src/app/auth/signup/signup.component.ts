import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {SignUpPending} from '../../_store/actions/auth.actions';
import {IStore} from '../../_store/interfaces/store.interface';
import {Select} from 'ngrx-actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  messagePreloader = false;

  @Select('auth.message')
  message$: Observable<string>;

  constructor(private router: Router,
              private _store: Store<IStore>) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['login']);
  }

  onSignUp(form): void {
    this.messagePreloader = true;

    this._store.dispatch(new SignUpPending(form.value));
  }
}
