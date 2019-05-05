import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IStore} from '../../_store/interfaces/store.interface';
import {ResetPasswordPending} from '../../_store/actions/auth.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _store: Store<IStore>,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  resetPassword(form): void {
    this._store.dispatch(new ResetPasswordPending({
      password: form.value.password,
      hash: this._route.snapshot.params.hash,
      email: this._route.snapshot.params.email
    }));
  }

}
