import {Action, Store} from 'ngrx-actions/dist';
import {IRoomsStore} from '../interfaces/rooms.interface';
import {GetSettingsError, GetSettingsSuccess} from '../actions/settings.actions';
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

  @Action(GetSettingsError)
  createRoomError(state: IRoomsStore, action: GetSettingsError) {
  }
}

