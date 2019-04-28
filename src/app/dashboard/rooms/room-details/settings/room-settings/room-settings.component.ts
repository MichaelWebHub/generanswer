import {Component, OnInit} from '@angular/core';
import {DeleteRoomPending, RenameRoomPending} from '../../../../../_store/actions/rooms.actions';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IRoom} from '../../../../../_store/interfaces/rooms.interface';
import {IStore} from '../../../../../_store/interfaces/store.interface';

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss']
})
export class RoomSettingsComponent implements OnInit {

  @Select('rooms.selection')
  room$: Observable<IRoom>;

  constructor(private _store: Store<IStore>,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  renameRoom(form): void {
    const data = {
      name: form.value.name,
      roomId: this._route.snapshot.params.roomId
    };

    this._store.dispatch(new RenameRoomPending(data));
  }

  deleteRoom(): void {
    this._store.dispatch(new DeleteRoomPending(this._route.snapshot.params.roomId));
  }
}
