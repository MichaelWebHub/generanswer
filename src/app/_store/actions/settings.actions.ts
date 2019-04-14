import {Action} from '@ngrx/store';
import {IRoom} from '../interfaces/rooms.interface';
import {ISettingsStore} from '../interfaces/settings.interface';


export class GetSettingsPending implements Action {
  public readonly type = '[Settings] Get settings pending';

  constructor(public payload: string) {
  }
}

export class GetSettingsSuccess implements Action {
  public readonly type = '[Settings] Get settings success';

  constructor(public payload: ISettingsStore) {
  }
}

export class GetSettingsError implements Action {
  public readonly type = '[Settings] Get settings error';

  constructor(public payload: string) {
  }
}
