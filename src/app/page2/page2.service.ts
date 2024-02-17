import { Injectable } from '@angular/core';

class Complaints {
  complaint!: string;

  count!: number;
}

export class ComplaintsWithPercent {
  complaint!: string;

  count!: number;

  cumulativePercent!: number;
}

const complaintsData: Complaints[] = [
  { complaint: '2600010A', count: 780 },
  { complaint: '332410CA', count: 120 },
  { complaint: '3705010B', count: 52 },
  { complaint: '36000R40', count: 1123 },
  { complaint: '40AD238F', count: 321 },
  { complaint: '4SD24425', count: 89 },
  { complaint: '49SD3210', count: 222 },
];


@Injectable({
  providedIn: 'root'
})


@Injectable()
export class Page2Service {
  getComplaintsData(): ComplaintsWithPercent[] {
    const data = complaintsData.sort((a, b) => b.count - a.count);
    const totalCount = data.reduce((prevValue, item) => prevValue + item.count, 0);
    let cumulativeCount = 0;
    return data.map((item, index) => {
      cumulativeCount += item.count;
      return {
        complaint: item.complaint,
        count: item.count,
        cumulativePercent: Math.round(cumulativeCount * 100 / totalCount),
      };
    });
  }
}