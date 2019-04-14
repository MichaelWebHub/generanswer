import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ofAction} from 'ngrx-actions/dist';
import {
  CreateRoomError,
  CreateRoomPending,
  CreateRoomSuccess,
  GetRoomsError,
  GetRoomsPending,
  GetRoomsSuccess
} from '../actions/rooms.actions';
import {IRoom} from '../interfaces/rooms.interface';

@Injectable()
export class RoomsEffects {
  @Effect()
  createRoom = this.actions$.pipe(
    ofAction(CreateRoomPending),
    map((action: CreateRoomPending) => {
      return action.payload;
    }),
    switchMap((data: { userId: string; name: string }) => {
      return this.http.post('/createRoom', data)
        .pipe(
          map((response: { room: IRoom; status: boolean; message?: string }): any => {
            if (response.status) {
              return new CreateRoomSuccess(response.room);
            } else {
              return new CreateRoomError(response.message);
            }
          })
        );
    })
  );

  /** ---------------------------------------------------- */

  @Effect()
  getRooms = this.actions$.pipe(
    ofAction(GetRoomsPending),
    map((action: GetRoomsPending) => {
      return action.payload;
    }),
    switchMap((userId: string) => {
      return this.http.get(`/getRooms/${userId}`)
        .pipe(
          map((response: { rooms: IRoom[]; status: boolean; message?: string }): any => {
            if (response.status) {
              return new GetRoomsSuccess(response.rooms);
            } else {
              return new GetRoomsError(response.message);
            }
          })
        );
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

}
