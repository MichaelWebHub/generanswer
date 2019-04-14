import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
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
