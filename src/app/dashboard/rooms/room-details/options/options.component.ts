import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {CheckOption, GetOptionsPending, RefreshOptions} from '../../../../_store/actions/options.actions';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IOption} from '../../../../_store/interfaces/settings.interface';
import {IStore} from '../../../../_store/interfaces/store.interface';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, OnDestroy {

  @Select('options.collection')
  options$: Observable<IOption[]>;

  constructor(private _route: ActivatedRoute,
              private _store: Store<IStore>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetOptionsPending(this._route.snapshot.params.roomId));
  }

  ngOnDestroy(): void {
    this.onRefreshClick();
  }

  onCheckboxClick(item: any): void {
    item.isChecked = !item.isChecked;

    this._store.dispatch(new CheckOption(item));
  }

  onRefreshClick(): void {
    this._store.dispatch(new RefreshOptions());
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(e: KeyboardEvent): void {
    console.log(e.code);
    if (e.code === 'Escape') {
      this.onRefreshClick();
    }
  }

}
