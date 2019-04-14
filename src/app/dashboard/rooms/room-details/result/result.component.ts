import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

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
    element.style.background = '#39a379';
    setTimeout(function () {
      element.style.background = '#efefef';
    }, 300);
  }

}
