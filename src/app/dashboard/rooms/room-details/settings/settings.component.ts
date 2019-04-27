import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {CreateOptionPending, DeleteOptionPending, EditOptionPending, GetSettingsPending} from '../../../../_store/actions/settings.actions';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from 'ngrx-actions/dist';
import {IConfig, IOption} from '../../../../_store/interfaces/settings.interface';

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

  @Select('settings.config')
  config$: Observable<IConfig>;

  constructor(private _location: Location,
              private _route: ActivatedRoute,
              private _store: Store<any>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetSettingsPending(this._route.snapshot.params.roomId));
  }

  onBackButtonClick(): void {
    this._location.back();
  }

  addInput(n: number): any {
    // this.oConfig.aTextStart.push('');
  }

  onAddCheckBoxSubmit(form: any): void {
    // this.saveOptionPreloader = true;
    const data = {
      roomID: this._route.snapshot.params.roomId,
      data: form.value
    };

    this._store.dispatch(new CreateOptionPending(data));
  }

  onEditCheckBoxSubmit(form: any): void {
    // this.updateOptionsPreloader = true;

    let data = {
      options: [],
      roomId: this._route.snapshot.params.roomId
    };

    for (const key in form.value) {
      data.options.push(form.value[key]);
    }

    this._store.dispatch(new EditOptionPending(data));
  }

  onDeleteCheckboxClick(option: IOption): void {
    this._store.dispatch(new DeleteOptionPending({roomId: this._route.snapshot.params.roomId, optionId: option._id}));
  }
}
