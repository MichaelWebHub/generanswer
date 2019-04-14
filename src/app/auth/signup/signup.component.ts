import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {SignUpPending} from '../../_store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  messagePreloader = false;
  message = '';

  constructor(private router: Router,
              private _store: Store<any>) {
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
