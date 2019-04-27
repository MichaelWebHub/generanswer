import {Component, OnInit, Renderer2} from '@angular/core';
import {Store} from '@ngrx/store';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IOption} from '../../../../_store/interfaces/settings.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Select('options.selection')
  options$: Observable<IOption[]>

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
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
    element.style.background = '#39a37980';
    setTimeout(function () {
      element.style.background = '#efefef';
    }, 300);
  }

}
