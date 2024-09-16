import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  powerSections = [
    {
      name: 'Generation',
      subSections: [
        {
          name: 'Renewable',
          items: ['Solar', 'Wind', 'Hydro']
        },
        {
          name: 'Non Renewable',
          items: ['Coal/LNG', 'Gas Fired', 'CPP']
        }
      ]
    },
    {
      name: 'Transmission',
      subSections: [
        {
          name: 'Grid Interchange',
        },
        {
          name: 'Load Dispatch Center',
        }
      ]
    },
    'Distribution',
    {
      name: 'Storage',
      items: ['Battery Energy Storage', 'Energy Control Center']
    }
  ];

  oilGasSections = ['Upstream', 'Midstream', 'Refinery', 'Pipelines', 'Terminals & Automation'];

}
