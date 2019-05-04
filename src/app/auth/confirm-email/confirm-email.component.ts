import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {IStore} from '../../_store/interfaces/store.interface';
import {ConfirmEmail} from '../../_store/actions/auth.actions';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private _store: Store<IStore>,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {

    this._store.dispatch(new ConfirmEmail(this._route.snapshot.params.token));

  }

}
