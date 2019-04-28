import {Component, OnInit} from '@angular/core';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IOption} from '../../../../../_store/interfaces/settings.interface';
import {CreateOptionPending, DeleteOptionPending, EditOptionPending} from '../../../../../_store/actions/settings.actions';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-options-settings',
  templateUrl: './options-settings.component.html',
  styleUrls: ['./options-settings.component.scss']
})
export class OptionsSettingsComponent implements OnInit {

  @Select('settings.options')
  options$: Observable<IOption[]>;

  constructor(private _location: Location,
              private _route: ActivatedRoute,
              private _store: Store<any>) {
  }

  ngOnInit() {
  }

  onBackButtonClick(): void {
    this._location.back();
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

    const data = {
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
