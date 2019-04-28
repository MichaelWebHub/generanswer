import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SetActiveRoom} from '../../../_store/actions/rooms.actions';
import {ActivatedRoute} from '@angular/router';
import {GetSettingsPending} from '../../../_store/actions/settings.actions';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  constructor(private _store: Store<any>,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._store.dispatch(new SetActiveRoom(this._route.snapshot.params.roomId));
    this._store.dispatch(new GetSettingsPending(this._route.snapshot.params.roomId));
  }

}
