import {Component, OnInit} from '@angular/core';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IConfig} from '../../../../../_store/interfaces/settings.interface';
import {Store} from '@ngrx/store';
import {AddNewInput, EditConfigPending} from '../../../../../_store/actions/settings.actions';
import {ActivatedRoute} from '@angular/router';
import {IStore} from '../../../../../_store/interfaces/store.interface';

@Component({
  selector: 'app-config-settings',
  templateUrl: './config-settings.component.html',
  styleUrls: ['./config-settings.component.scss']
})
export class ConfigSettingsComponent implements OnInit {

  @Select('settings.config')
  config$: Observable<IConfig>;

  constructor(private _store: Store<IStore>,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  addInput(): any {
    this._store.dispatch(new AddNewInput());
  }

  onEditGlobalConfig(form): void {
    const configData = form.value;

    const textStart = [];
    for (const key in configData.textStart) {
      textStart.push(configData.textStart[key]);
    }

    let lastNotEmptyIndex = 0;
    textStart.forEach((s, i) => {
      if (s !== '') {
        lastNotEmptyIndex = i;
      }
    });
    textStart.splice(lastNotEmptyIndex + 1);

    configData.textStart = textStart;


    const data = {
      roomId: this._route.snapshot.params.roomId,
      config: configData
    };

    this._store.dispatch(new EditConfigPending(data));
  }

}
