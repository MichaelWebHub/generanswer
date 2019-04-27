import {Action} from '@ngrx/store';
import {IOption} from '../interfaces/settings.interface';

/** Get options actions */

export class GetOptionsPending implements Action {
  public readonly type = '[Options] Get options pending';

  constructor(public payload: string) {
  }
}

export class GetOptionsSuccess implements Action {
  public readonly type = '[Options] Get options success';

  constructor(public payload: IOption[]) {
  }
}

export class GetOptionsError implements Action {
  public readonly type = '[Options] Get options error';

  constructor(public payload: string) {
  }
}

/** Check options */
export class CheckOption implements Action {
  public readonly type = '[Options] Check option';

  constructor(public payload: IOption) {
  }
}

/** Refresh options */
export class RefreshOptions implements Action {
  public readonly type = '[Options] Refresh option';
}
