import { PercentPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import * as ApexCharts from 'apexcharts';
// core version + navigation, pagination modules:
import Swiper from 'swiper';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  ngOnInit() {}

  items: any = [
    {
      date: 'News and Reviews',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta labore, voluptatibus aliquam, temporibus rerum voluptate alias, consectetur blanditiis corporis neque distinctio molestiae. Praesentium impedit provident dolore neque magni doloribus excepturi.',
    },
    {
      date: 'News and Reviews',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta labore, voluptatibus aliquam, temporibus rerum voluptate alias, consectetur blanditiis corporis neque distinctio molestiae. Praesentium impedit provident dolore neque magni doloribus excepturi.',
    },
    {
      date: 'News and Reviews',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta labore, voluptatibus aliquam, temporibus rerum voluptate alias, consectetur blanditiis corporis neque distinctio molestiae. Praesentium impedit provident dolore neque magni doloribus excepturi.',
    },
  ];

  testimonialItems: any = [
    {
      title: 'Name',
      company_name: 'Company Name',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate excepturi earum a nam assumenda animi consequuntur facilis pariatur esse inventore, doloribus dicta amet sed nesciunt qui unde nemo! Aliquid, ea!',
    },
    {
      title: 'Name',
      company_name: 'Company Name',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate excepturi earum a nam assumenda animi consequuntur facilis pariatur esse inventore, doloribus dicta amet sed nesciunt qui unde nemo! Aliquid, ea!',
    },
    {
      title: 'Name',
      company_name: 'Company Name',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate excepturi earum a nam assumenda animi consequuntur facilis pariatur esse inventore, doloribus dicta amet sed nesciunt qui unde nemo! Aliquid, ea!',
    },
    {
      title: 'Name',
      company_name: 'Company Name',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate excepturi earum a nam assumenda animi consequuntur facilis pariatur esse inventore, doloribus dicta amet sed nesciunt qui unde nemo! Aliquid, ea!',
    },
  ];

  slides: any = [
    {
      text: 'Data Integration: Seamlessly integrate and consolidate data from multiple sources with our robust data integration capabilities. Connect to various databases, data warehouses, cloud storage, and third-party applications to create a unified view of your data landscape. With streamlined data integration, you can ensure data accuracy, consistency, and accessibility across your organization',
      imgSrc: '../../assets/images/factory.svg',
    },
    {
      text: 'Analytics Platform: Our advanced analytics platform offers a seamless and intuitive interface that empowers users of all skill levels to explore data effortlessly. With a rich set of visualization tools, interactive dashboards, and powerful reporting capabilities, you can dive deep into your data, uncover valuable insights, and drive data-informed strategies',
      imgSrc: '../../assets/images/factory.svg',
    },
    {
      text: "Data Visualization: Transform complex data into meaningful and visually appealing representations with Supra Controls' data visualization tools. Build stunning charts, graphs, and interactive visualizations that communicate insights effectively to stakeholders at all levels. Our drag-and-drop interface makes it easy to create captivating visual stories without the need for extensive coding or design skills",
      imgSrc: '../../assets/images/factory.svg',
    },
    {
      text: 'Data Governance: Protect your data and maintain compliance with Supra Controls’ robust data governance capabilities. Implement data quality rules, define access controls, and monitor data usage to ensure data integrity, privacy, and security. Stay in full control of your data assets while adhering to industry regulations and best practices',
      imgSrc: '../../assets/images/factory.svg',
    },
  ];

  // onSwiper([swiper]) {
  // }

  onSlideChange() {}

  populationByRegions: any = [
    {
      region: 'Asia',
      val: 4119626293,
    },
    {
      region: 'Africa',
      val: 1012956064,
    },
    {
      region: 'Europe',
      val: 727082222,
    },
    {
      region: 'Oceania',
      val: 35104756,
    },
  ];
  pipe: any = new PercentPipe('en-US');

  // customizeTooltip = (arg: any) => ({
  //   text: `${arg.valueText} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
  // });

  constructor(private renderer: Renderer2) {}

  @ViewChild('swiperContainer') swiperContainer: any = ElementRef;
  @ViewChild('swiperContainer1') swiperContainer1: any = ElementRef;
  @ViewChild('swiperContainer2') swiperContainer2: any = ElementRef;
  @ViewChild('chart') chartContainer: any = ElementRef;

  ngAfterViewInit() {
    let swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 300,
      autoplay: {
        delay: 8000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });

    swiper.on('slideChange', function () {});

    let swiper1 = new Swiper(this.swiperContainer1.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 300,
      autoplay: {
        delay: 8000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
      },
    });

    swiper1.on('slideChange', function () {});

    let swiper2 = new Swiper(this.swiperContainer2.nativeElement, {
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      speed: 300,
      autoplay: {
        delay: 8000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
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

    swiper2.on('slideChange', function () {});

    const options = {
      chart: {
        type: 'donut',
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      series: [100, 55, 15],
      labels: ['Label 1', 'Label 2', 'Label 3'], // Add labels for each series item
      formatter: function (val: any) {
        return val + '%';
      },
      plotOptions: {
        pie: {
          size: 300,
          customScale: 0.6,
          expandOnClick: true,
          donut: {
            size: '75%',
          },
          labels: {
            show: true,
          },
        },
      },
      legend: {
        position: 'top',
        show: false,
      },
    };

    const chart = new ApexCharts(this.chartContainer.nativeElement, options);
    chart.render();
  }
}
