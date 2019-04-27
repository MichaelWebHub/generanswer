import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GetOptionsPending} from '../../../../_store/actions/options.actions';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IOption} from '../../../../_store/interfaces/settings.interface';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Select('options.collection')
  options$: Observable<IOption[]>;

  constructor(private _route: ActivatedRoute,
              private _store: Store<any>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetOptionsPending(this._route.snapshot.params.roomId));
  }

  onCheckboxClick(item: any): void {
    item.bIsChecked = !item.bIsChecked;

    // const indexes = this.textToPrint.map(el => {
    //   return el._id;
    // });
    //
    // const index = indexes.indexOf(item._id);
    //
    // if (index < 0) {
    //   this.textToPrint.push(item);
    // } else {
    //   this.textToPrint.splice(index, 1);
    // }
    //
    // this.getTextStart(this.textToPrint.length);
  }

  onRefreshClick(): void {
    // this.aOptions.forEach(option => {
    //   option.bIsChecked = false;
    // });
    // this.textToPrint = [];
    // this.getTextStart(this.textToPrint.length);
  }

}
