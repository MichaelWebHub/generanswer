import {Action, Store} from 'ngrx-actions/dist';
import {IOption, IOptionsStore} from '../interfaces/settings.interface';
import {CheckOption, GetOptionsSuccess, RefreshOptions} from '../actions/options.actions';

@Store({
  collection: [],
  selection: []
})
export class OptionsReducer {
  @Action(GetOptionsSuccess)
  createOptionSuccess(state: IOptionsStore, action: GetOptionsSuccess) {
    state.collection = action.payload;
  }

  @Action(CheckOption)
  checkOption(state: IOptionsStore, action: CheckOption) {
    const index = state.collection.findIndex(it => it._id === action.payload._id);
    state.collection[index].isChecked = action.payload.isChecked;
    state.selection = state.collection.filter((option: IOption) => option.isChecked);
  }

  @Action(RefreshOptions)
  refreshOption(state: IOptionsStore) {
    state.collection.forEach((option: IOption) => {
      option.isChecked = false;
    });

    state.selection = state.collection.filter((option: IOption) => option.isChecked);
  }
}

