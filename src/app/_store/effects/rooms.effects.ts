import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ofAction} from 'ngrx-actions/dist';
import {
  CreateRoomError,
  CreateRoomPending,
  CreateRoomSuccess,
  DeleteRoomError,
  DeleteRoomPending,
  DeleteRoomSuccess,
  GetRoomsError,
  GetRoomsPending,
  GetRoomsSuccess, RenameRoomError,
  RenameRoomPending, RenameRoomSuccess
} from '../actions/rooms.actions';
import {IRoom} from '../interfaces/rooms.interface';
import {Router} from '@angular/router';

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

  /** ---------------------------------------------------- */

  @Effect()
  deleteRoom = this.actions$.pipe(
    ofAction(DeleteRoomPending),
    map((action: DeleteRoomPending) => action.payload),
    switchMap((roomId: string) => {
      return this.http.get(`/deleteRoom/${roomId}`)
        .pipe(
          map((response: { status: boolean; message?: string }): any => {
            if (response.status) {
              this._router.navigate(['dashboard']);
              return new DeleteRoomSuccess(roomId);
            } else {
              return new DeleteRoomError(response.message);
            }
          })
        );
    })
  );

  /** ---------------------------------------------------- */

  @Effect()
  renameRoom = this.actions$.pipe(
    ofAction(RenameRoomPending),
    map((action: RenameRoomPending) => action.payload),
    switchMap((data: {name: string, roomId: string}) => {
      return this.http.post(`/renameRoom`, data)
        .pipe(
          map((response: { status: boolean; message?: string }): any => {
            if (response.status) {
              return new RenameRoomSuccess(data);
            } else {
              return new RenameRoomError(response.message);
            }
          })
        );
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private _router: Router) {
  }

}
