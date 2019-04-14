import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {GetSettingsPending} from '../../../../_store/actions/settings.actions';
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
    // const data = {
    //   roomID: this.roomID,
    //   data: form.value
    // };
    //
    // this.dataService.post('/createOption', data).subscribe(
    //   (result: any) => {
    //     this.saveOptionPreloader = false;
    //     this.aOptions = result.oRoom.aOptions;
    //     this.transferService.setObserver('aOptions', result.oRoom.aOptions);
    //   }
    // );
  }

  onEditCheckBoxSubmit(form: any): void {
    // this.updateOptionsPreloader = true;
    // for (const key in form.value) {
    //   const data = form.value[key];
    //   data.roomID = this.roomID;
    // }
  }
}
