import {Action} from '@ngrx/store';
import {IOption, ISettingsStore} from '../interfaces/settings.interface';


/** Settings GET actions */

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

/** Create option actions */

export class CreateOptionPending implements Action {
  public readonly type = '[Settings] Create option pending';

  constructor(public payload: { roomID: string; data: IOption }) {
  }
}

export class CreateOptionSuccess implements Action {
  public readonly type = '[Settings] Create option success';

  constructor(public payload: IOption[]) {
  }
}

export class CreateOptionError implements Action {
  public readonly type = '[Settings] Create option error';

  constructor(public payload: string) {
  }
}

/** Delete options actions */

export class DeleteOptionPending implements Action {
  public readonly type = '[Settings] Delete option pending';

  constructor(public payload: {roomId: string, optionId: string}) {
  }
}

export class DeleteOptionSuccess implements Action {
  public readonly type = '[Settings] Delete option success';

  constructor(public payload: string) {
  }
}

export class DeleteOptionError implements Action {
  public readonly type = '[Settings] Delete option error';

  constructor(public payload: string) {
  }
}

/** Edit options actions */

export class EditOptionPending implements Action {
  public readonly type = '[Settings] Edit option pending';

  constructor(public payload: {roomId: string, options: IOption[]}) {
  }
}

export class EditOptionSuccess implements Action {
  public readonly type = '[Settings] Edit option success';

  constructor(public payload: IOption[]) {
  }
}

export class EditOptionError implements Action {
  public readonly type = '[Settings] Edit option error';

  constructor(public payload: string) {
  }
}

