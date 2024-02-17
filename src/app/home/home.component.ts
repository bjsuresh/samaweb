import { PercentPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import * as ApexCharts from 'apexcharts';
// core version + navigation, pagination modules:
import Swiper from 'swiper';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  ngOnInit(){
  
  }

  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  onSlideChange() {
    console.log('slide change');
  }

  populationByRegions:any = [
    {
      region: 'Asia',
      val: 4119626293,
    }, {
      region: 'Africa',
      val: 1012956064,
    }, {
      region: 'Europe',
      val: 727082222,
    }, {
      region: 'Oceania',
      val: 35104756,
    }
]
pipe: any = new PercentPipe('en-US');


// customizeTooltip = (arg: any) => ({
//   text: `${arg.valueText} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
// });


  constructor(private renderer: Renderer2){

  }

  @ViewChild('swiperContainer') swiperContainer:any = ElementRef;
  @ViewChild('chart') chartContainer:any = ElementRef;


  ngAfterViewInit() {
    
    let swiper = new Swiper(this.swiperContainer.nativeElement, {

      slidesPerView: 1,
      loop: true,
      speed:300,
      autoplay: {
        delay: 8000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },   
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    swiper.on('slideChange', function () {
      console.log('slide changed');
    });

    
  const options = {
    chart: {
      type: 'donut'
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    },
    series: [100, 55, 15],
    labels: ['Label 1', 'Label 2', 'Label 3'], // Add labels for each series item
    formatter: function (val:any) {
      return val + "%";
    },
    plotOptions: {
      pie: {
        size: 300,
        customScale: 0.6,
        expandOnClick: true,
        donut: {
          size: '75%'
        },
        labels: {
          show: true,
        }
      }
    },
    legend: {
      position: 'top',
      show: false
    }
  
  };

  const chart = new ApexCharts(this.chartContainer.nativeElement, options);
  chart.render();
    

  }

}
