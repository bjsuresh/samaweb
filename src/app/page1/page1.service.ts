import { Injectable } from '@angular/core';

export class ArchitectureInfo {
  datetime!: any;

  smp!: number;

  mmp!: number;

  cnstl!: number;

  cluster!: number;
  // new Date().getTime()
}

const architecturesInfo: ArchitectureInfo[] = [
  {
  datetime: new Date().toLocaleTimeString(),
  smp: 263,
  mmp: 208,
  cnstl: 109,
  cluster: 91,
}, 
// {
//   datetime: new Date().toLocaleTimeString(),
//   smp: 169,
//   mmp: 270,
//   cnstl: 61,
//   cluster: 7,
// }, {
//   datetime: new Date().toLocaleTimeString(),
//   smp: 57,
//   mmp: 261,
//   cnstl: 157,
//   cluster: 45,
// }, {
//   datetime: new Date().toLocaleTimeString(),
//   smp: 0,
//   mmp: 154,
//   cnstl: 121,
//   cluster: 211,
// }, {
//   datetime: new Date().toLocaleTimeString(),
//   smp: 0,
//   mmp: 97,
//   cnstl: 39,
//   cluster: 382,
// }
];


@Injectable({
  providedIn: 'root'
})
export class Page1Service {

  getArchitecturesInfo(): ArchitectureInfo[] {
    return architecturesInfo;
  }
}
