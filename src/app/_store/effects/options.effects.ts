import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ofAction} from 'ngrx-actions/dist';
import {IOption} from '../interfaces/settings.interface';
import {GetOptionsError, GetOptionsPending, GetOptionsSuccess} from '../actions/options.actions';

@Injectable()
export class OptionsEffects {

  /** ---------------------------------------------------- */

  @Effect()
  getOptions = this.actions$.pipe(
    ofAction(GetOptionsPending),
    map((action: GetOptionsPending) => action.payload),
    switchMap((roomID: string) => {
      return this.http.get(`/getOptions/${roomID}`)
        .pipe(
          map((response: { options: IOption[], status: boolean; message?: string }) => {
            if (response.status) {
              return new GetOptionsSuccess(response.options);
            } else {
              return new GetOptionsError(response.message);
            }
          })
        );
    })
  );


  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

}
