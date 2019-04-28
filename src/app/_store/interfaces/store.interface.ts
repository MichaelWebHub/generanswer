import {IRoomsStore} from './rooms.interface';
import {IAuthStore} from './auth.interface';
import {IOptionsStore, ISettingsStore} from './settings.interface';

export interface IStore {
  auth: IAuthStore;
  rooms: IRoomsStore;
  settings: ISettingsStore;
  options: IOptionsStore;
}
