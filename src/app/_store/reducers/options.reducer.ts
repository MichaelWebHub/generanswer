import {Action, Store} from 'ngrx-actions/dist';
import {IOptionsStore} from '../interfaces/settings.interface';
import {GetOptionsSuccess} from '../actions/options.actions';

@Store({
  collection: []
})
export class OptionsReducer {
  @Action(GetOptionsSuccess)
  createOptionSuccess(state: IOptionsStore, action: GetOptionsSuccess) {
    state.collection = action.payload;
  }
}

