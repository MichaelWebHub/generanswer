export interface IRoom {
  _id: string;
  name: string;
  userId: string;
}

export interface IRoomsStore {
  collection: IRoom[];
  selections: {};
  loading: false;
}
