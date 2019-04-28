import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select} from 'ngrx-actions/dist';
import {Observable, Subject} from 'rxjs';
import {IConfig, IOption} from '../../../../_store/interfaces/settings.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {

  @Select('options.selection')
  options$: Observable<IOption[]>;

  @Select('settings.config')
  config$: Observable<IConfig>;

  textStartArray: string[] = [];

  textStart: string;

  /** For unsubscribe */
  control$$: Subject<boolean> = new Subject();

  constructor() {
    this.config$
      .pipe(takeUntil(this.control$$))
      .subscribe((config: IConfig) => {
        if (config.hasOwnProperty('textStart')) {
          this.textStartArray = config.textStart;
          this.getTextStart(0);
        }
      });

    this.options$
      .pipe(takeUntil(this.control$$))
      .subscribe((options: IOption[]) => {
        if (options) {
          this.getTextStart(options.length);
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.control$$.next(true);
  }

  getTextStart(length): void {
    if (this.textStartArray[length] === '' && length > 0) {
      this.getTextStart(length - 1);
    } else {
      if (this.textStartArray[length]) {
        this.textStart = this.textStartArray[length] + '\n';
      } else {
        this.textStart = this.textStartArray[this.textStartArray.length - 1] + '\n';
      }
    }
  }

  copyToClipboard(element: HTMLElement): void {
    const tmp = document.createElement('textarea');
    tmp.classList.add('copy-output');

    tmp.textContent += element.textContent;

    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
  }

  makeBgTransition(element: HTMLElement): void {
    element.style.background = '#5ac59b';
    setTimeout(function () {
      element.style.background = '#efefef';
    }, 300);
  }

}
