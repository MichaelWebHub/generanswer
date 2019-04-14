import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxClick(item: any): void {
    // item.bIsChecked = !item.bIsChecked;
    //
    // const indexes = this.textToPrint.map(el => {
    //   return el._id;
    // });
    //
    // const index = indexes.indexOf(item._id);
    //
    // if (index < 0) {
    //   this.textToPrint.push(item);
    // } else {
    //   this.textToPrint.splice(index, 1);
    // }
    //
    // this.getTextStart(this.textToPrint.length);
  }

  onRefreshClick(): void {
    // this.aOptions.forEach(option => {
    //   option.bIsChecked = false;
    // });
    // this.textToPrint = [];
    // this.getTextStart(this.textToPrint.length);
  }
}
