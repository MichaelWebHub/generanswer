import {Action, Store} from 'ngrx-actions/dist';
import {CreateRoomSuccess, DeleteRoomSuccess, GetRoomsSuccess, RenameRoomSuccess, SetActiveRoom} from '../actions/rooms.actions';
import {IRoomsStore} from '../interfaces/rooms.interface';

@Store({
  collection: [],
  selection: {},
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

  @Action(SetActiveRoom)
  setActiveRoom(state: IRoomsStore, action: SetActiveRoom) {
    const index = state.collection.findIndex(it => it._id === action.payload);
    state.selection = state.collection[index];
  }

  @Action(RenameRoomSuccess)
  renameRoom(state: IRoomsStore, action: RenameRoomSuccess) {
    const index = state.collection.findIndex(it => it._id === action.payload.roomId);
    state.collection[index].name = action.payload.name;
    state.selection = state.collection[index];
  }

  @Action(DeleteRoomSuccess)
  deleteRoomError(state: IRoomsStore, action: DeleteRoomSuccess) {
    const index = state.collection.findIndex(it => it._id === action.payload);
    state.collection.splice(index, 1);
  }

}

