import {Action, Store} from 'ngrx-actions/dist';
import {CreateRoomSuccess, DeleteRoomSuccess, GetRoomsSuccess} from '../actions/rooms.actions';
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

  /** ---------------------------------------------------- */

  @Action(GetRoomsSuccess)
  getRoomsSuccess(state: IRoomsStore, action: GetRoomsSuccess) {
    state.collection = action.payload;
  }

  @Action(DeleteRoomSuccess)
  deleteRoomError(state: IRoomsStore, action: DeleteRoomSuccess) {
    const index = state.collection.findIndex(it => it._id === action.payload);
    state.collection.splice(index, 1);
  }

}

