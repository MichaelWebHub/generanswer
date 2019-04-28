import {Action} from '@ngrx/store';
import {IRoom} from '../interfaces/rooms.interface';

export class CreateRoomPending implements Action {
  public readonly type = '[Rooms] Create room pending';

  constructor(public payload: { userId: string, name: string }) {
  }
}

export class CreateRoomSuccess implements Action {
  public readonly type = '[Rooms] Create room success';

  constructor(public payload: IRoom) {
  }
}

export class CreateRoomError implements Action {
  public readonly type = '[Rooms] Create room error';

  constructor(public payload: string) {
  }
}

/** ---------------------------------------------------- */

export class GetRoomsPending implements Action {
  public readonly type = '[Rooms] Get rooms pending';

  constructor(public payload: string) {
  }
}

export class GetRoomsSuccess implements Action {
  public readonly type = '[Rooms] Get room success';

  constructor(public payload: IRoom[]) {
  }
}

export class GetRoomsError implements Action {
  public readonly type = '[Rooms] Get room error';

  constructor(public payload: string) {
  }
}

/** ---------------------------------------------------- */

export class DeleteRoomPending implements Action {
  public readonly type = '[Rooms] Delete room pending';

  constructor(public payload: string) {
  }
}

export class DeleteRoomSuccess implements Action {
  public readonly type = '[Rooms] Delete room success';

  constructor(public payload: string) {
  }
}

export class DeleteRoomError implements Action {
  public readonly type = '[Rooms] Delete room error';

  constructor(public payload: string) {
  }
}

/** ---------------------------------------------------- */

export class RenameRoomPending implements Action {
  public readonly type = '[Rooms] Rename room pending';

  constructor(public payload: {name: string; roomId: string}) {
  }
}

export class RenameRoomSuccess implements Action {
  public readonly type = '[Rooms] Rename room success';

  constructor(public payload: {name: string; roomId: string}) {
  }
}

export class RenameRoomError implements Action {
  public readonly type = '[Rooms] Rename room error';

  constructor(public payload: string) {
  }
}

/** ---------------------------------------------------- */

export class SetActiveRoom implements Action {
  public readonly type = '[Rooms] Set active room';

  constructor(public payload: string) {
  }
}
