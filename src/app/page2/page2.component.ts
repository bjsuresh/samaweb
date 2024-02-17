import { Component,ViewChild, enableProdMode } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ComplaintsWithPercent, Page2Service } from './page2.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {

  // displayedColumns: string[] = ['position', 'month', 'datas', 'no_of_orders'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator:any =  MatPaginator;


  dataSource: ComplaintsWithPercent[];

  constructor(service: Page2Service) {
    this.dataSource = service.getComplaintsData();
  }

  customizeTooltip = (info: any) => ({
    html: `<div><div class='tooltip-header'>${
      info.argumentText}</div>`
                + '<div class=\'tooltip-body\'><div class=\'series-name\'>'
                + `<span class='top-series-name'>${info.points[0].seriesName}</span>`
                + ': </div><div class=\'value-text\'>'
                + `<span class='top-series-value'>${info.points[0].valueText}</span>`
                + '</div><div class=\'series-name\'>'
                + `<span class='bottom-series-name'>${info.points[1].seriesName}</span>`
                + ': </div><div class=\'value-text\'>'
                + `<span class='bottom-series-value'>${info.points[1].valueText}</span>`
                + '% </div></div></div>',
  });

  customizeLabelText = (info: any) => `${info.valueText}%`;
}


export interface PeriodicElement {
  month: string;
  position: number;
  datas: number;
  no_of_orders: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, month: 'Jan', datas: 250000, no_of_orders: 372 },
  {position: 2, month: 'Feb', datas: 431000, no_of_orders: 412 },
  {position: 3, month: 'Mar', datas: 64600, no_of_orders: 572},
  {position: 4, month: 'April', datas: 522000, no_of_orders: 224 },
  {position: 5, month: 'May', datas: 464000, no_of_orders: 246 },
  {position: 6, month: 'Jun', datas: 470000, no_of_orders: 601 },
  {position: 7, month: 'July', datas: 534000, no_of_orders: 642 },
  {position: 8, month: 'Aug', datas: 407000, no_of_orders: 590 },
  {position: 9, month: 'Sep', datas: 465000, no_of_orders: 527 },
  {position: 10, month: 'Oct', datas: 424000, no_of_orders: 273 },
  {position: 11, month: 'Nov', datas: 484000, no_of_orders: 251 },
  {position: 12, month: 'Dec', datas: 2310000, no_of_orders: 331 },
];
