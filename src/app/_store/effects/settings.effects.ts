import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ofAction} from 'ngrx-actions/dist';
import {GetRoomsError} from '../actions/rooms.actions';
import {
  CreateOptionError,
  CreateOptionPending,
  CreateOptionSuccess, DeleteOptionError, DeleteOptionPending, DeleteOptionSuccess,
  GetSettingsPending,
  GetSettingsSuccess
} from '../actions/settings.actions';
import {IOption, ISettingsStore} from '../interfaces/settings.interface';

@Injectable()
export class SettingsEffects {

  /** ---------------------------------------------------- */

  @Effect()
  getSettings = this.actions$.pipe(
    ofAction(GetSettingsPending),
    map((action: GetSettingsPending) => action.payload),
    switchMap((roomId: string) => {
      return this.http.get(`/getSettings/${roomId}`)
        .pipe(
          map((response: { settings: ISettingsStore; status: boolean; message?: string }): any => {
            if (response.status) {
              return new GetSettingsSuccess(response.settings);
            } else {
              return new GetRoomsError(response.message);
            }
          })
        );
    })
  );

  /** ---------------------------------------------------- */

  @Effect()
  setSettings = this.actions$.pipe(
    ofAction(CreateOptionPending),
    map((action: CreateOptionPending) => action.payload),
    switchMap((data: { roomID: string; data: IOption }) => {
      return this.http.post(`/createOption`, data)
        .pipe(
          map((response: { options: IOption[], status: boolean; message?: string }) => {
            if (response.status) {
              return new CreateOptionSuccess(response.options);
            } else {
              return new CreateOptionError(response.message);
            }
          })
        );
    })
  );

  /** ---------------------------------------------------- */

  @Effect()
  deleteOption = this.actions$.pipe(
    ofAction(DeleteOptionPending),
    map((action: DeleteOptionPending) => action.payload),
    switchMap((data: {roomId: string; optionId: string}) => {
      return this.http.get(`/deleteOption/${data.roomId}/${data.optionId}`)
        .pipe(
          map((response: { status: boolean; message?: string }) => {
            if (response.status) {
              return new DeleteOptionSuccess(data.optionId);
            } else {
              return new DeleteOptionError(response.message);
            }
          })
        );
    })
  );


  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

}
