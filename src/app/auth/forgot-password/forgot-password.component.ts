import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {IStore} from '../../_store/interfaces/store.interface';
import {RequestResetPassword} from '../../_store/actions/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _store: Store<IStore>) { }

  ngOnInit() {
  }

  sendEmail(form): void {
    this._store.dispatch(new RequestResetPassword(form.value));
  }

}
