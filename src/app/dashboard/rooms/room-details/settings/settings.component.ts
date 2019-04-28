import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {GetSettingsPending} from '../../../../_store/actions/settings.actions';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from 'ngrx-actions/dist';
import {IOption} from '../../../../_store/interfaces/settings.interface';
import {IStore} from '../../../../_store/interfaces/store.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Select('settings.loaded')
  dataLoaded$: Observable<boolean>;

  @Select('settings.options')
  options$: Observable<IOption[]>;

  constructor(private _location: Location,
              private _route: ActivatedRoute,
              private _store: Store<IStore>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetSettingsPending(this._route.snapshot.params.roomId));
  }
}
