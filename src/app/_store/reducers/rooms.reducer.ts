import {Action, Store} from 'ngrx-actions/dist';
import {CreateRoomError, CreateRoomSuccess, GetRoomsError, GetRoomsSuccess} from '../actions/rooms.actions';
import {IRoomsStore} from '../interfaces/rooms.interface';

@Store({
  collection: [],
  selections: {},
  loading: false
})
export class RoomsReducer {
  @Action(CreateRoomSuccess)
  createRoomSuccess(state: IRoomsStore, action: CreateRoomSuccess) {
    state.collection.push(action.payload);
  }

  @Action(CreateRoomError)
  createRoomError(state: IRoomsStore, action: CreateRoomError) {
  }

  /** ---------------------------------------------------- */

  @Action(GetRoomsSuccess)
  getRoomsSuccess(state: IRoomsStore, action: GetRoomsSuccess) {
    state.collection = action.payload;
  }

  @Action(GetRoomsError)
  getRoomsError(state: IRoomsStore, action: GetRoomsError) {
  }
}

