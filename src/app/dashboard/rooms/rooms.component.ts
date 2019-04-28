import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Select} from 'ngrx-actions/dist';
import {Observable, Subject} from 'rxjs';
import {IUser} from '../../_store/interfaces/auth.interface';
import {CreateRoomPending, GetRoomsPending} from '../../_store/actions/rooms.actions';
import {IRoom} from '../../_store/interfaces/rooms.interface';
import {takeUntil} from 'rxjs/operators';
import {IStore} from '../../_store/interfaces/store.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {

  @Select('auth.user')
  user$: Observable<IUser>;

  @Select('rooms.collection')
  rooms$: Observable<IRoom[]>;

  /** Объект для отписки */
  control$$: Subject<boolean> = new Subject();

  constructor(private _store: Store<IStore>) {
  }

  ngOnInit(): void {
    this.user$
      .pipe(takeUntil(this.control$$))
      .subscribe(
        (user: IUser) => {
          this._store.dispatch(new GetRoomsPending(user._id));
        });
  }

  ngOnDestroy(): void {
    this.control$$.next(true);
  }

  createRoom(form): void {
    this._store.dispatch(new CreateRoomPending(form.value));
  }

}
