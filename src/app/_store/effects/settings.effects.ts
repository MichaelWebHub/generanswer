import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ofAction} from 'ngrx-actions/dist';
import {GetRoomsError} from '../actions/rooms.actions';
import {GetSettingsPending, GetSettingsSuccess} from '../actions/settings.actions';
import {ISettingsStore} from '../interfaces/settings.interface';

@Injectable()
export class SettingsEffects {

  /** ---------------------------------------------------- */

  @Effect()
  getSettings = this.actions$.pipe(
    ofAction(GetSettingsPending),
    map((action: GetSettingsPending) => {
      return action.payload;
    }),
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

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

}
