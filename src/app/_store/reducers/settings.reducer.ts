import {Action, Store} from 'ngrx-actions/dist';
import {CreateOptionSuccess, DeleteOptionSuccess, GetSettingsSuccess} from '../actions/settings.actions';
import {ISettingsStore} from '../interfaces/settings.interface';

@Store({
  options: [],
  loaded: false,
  config: {},
  roomId: '',
})
export class SettingsReducer {
  @Action(GetSettingsSuccess)
  createRoomSuccess(state: ISettingsStore, action: GetSettingsSuccess) {
    state.options = action.payload.options;
    state.config = action.payload.config;
    state.roomId = action.payload.roomId;
    state.loaded = true;
  }

  @Action(CreateOptionSuccess)
  createOptionSuccess(state: ISettingsStore, action: CreateOptionSuccess) {
    state.options = action.payload;
  }

  @Action(DeleteOptionSuccess)
  deleteOptionSuccess(state: ISettingsStore, action: DeleteOptionSuccess) {
    const index = state.options.findIndex(it => it._id === action.payload);
    state.options.splice(index, 1);
  }
}

