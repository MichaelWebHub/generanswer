export interface IRoom {
  _id: string;
  name: string;
  userId: string;
}

export interface IRoomsStore {
  collection: IRoom[];
  selection: IRoom;
  loading: false;
}
