import {Action, Store} from 'ngrx-actions/dist';
import {AddNewInput, CreateOptionSuccess, DeleteOptionSuccess, EditConfigSuccess, GetSettingsSuccess} from '../actions/settings.actions';
import {ISettingsStore} from '../interfaces/settings.interface';

@Store({
  options: [],
  loaded: false,
  config: {},
  roomId: '',
})
export class SettingsReducer {
  @Action(GetSettingsSuccess)
  createRoom(state: ISettingsStore, action: GetSettingsSuccess) {
    state.options = action.payload.options;
    state.config = action.payload.config;
    state.roomId = action.payload.roomId;
    state.loaded = true;
  }

  @Action(CreateOptionSuccess)
  createOption(state: ISettingsStore, action: CreateOptionSuccess) {
    state.options = action.payload;
  }

  @Action(AddNewInput)
  addNewInput(state: ISettingsStore) {
    state.config.textStart.push('');
  }

  @Action(DeleteOptionSuccess)
  deleteOption(state: ISettingsStore, action: DeleteOptionSuccess) {
    const index = state.options.findIndex(it => it._id === action.payload);
    state.options.splice(index, 1);
  }

  @Action(EditConfigSuccess)
  editConfig(state: ISettingsStore, action: EditConfigSuccess) {
    state.config = action.payload;
  }
}

