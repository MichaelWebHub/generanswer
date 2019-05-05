import {Component, OnInit} from '@angular/core';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {LogOut} from '../_store/actions/auth.actions';
import {IStore} from '../_store/interfaces/store.interface';
import {IUser} from '../_store/interfaces/auth.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select('auth.authenticated')
  authenticated$: Observable<boolean>;

  @Select('auth.user')
  user$: Observable<IUser>;

  constructor(private _store: Store<IStore>) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this._store.dispatch(new LogOut());
  }

}
