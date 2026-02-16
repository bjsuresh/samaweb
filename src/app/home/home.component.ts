import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('countAnimation', [
      transition(':increment', [
        style({ transform: 'scale(1.2)', color: '#00ff88' }),
        animate('300ms ease-out', style({ transform: 'scale(1)', color: '*' }))
      ]),
      transition(':decrement', [
        style({ transform: 'scale(0.8)', color: '#ff4444' }),
        animate('300ms ease-out', style({ transform: 'scale(1)', color: '*' }))
      ])
    ])
  ]
})
export class HomeComponent  implements OnInit, OnDestroy {
  // Active Devices
  activeDevices: number = 147;
  totalDevices: number = 150;
  devicesTrend: number = 2.3;
  devicesChartPoints: string = '';
  
  // System Uptime
  uptimePercentage: number = 99.8;
  uptimeDays: number = 127;
  uptimeRingOffset: number = 0;
  
  // Production Rate
  productionRate: number = 2847;
  productionTrend: number = 12.5;
  productionChartPoints: string = '';
  
  // Active Alerts
  activeAlerts: number = 3;
  alertsTrend: number = -2;
  
  // Live Status
  lastUpdateTime: Date = new Date();
  
  // Ticker Stats
  energyConsumption: number = 3456;
  avgResponseTime: number = 23;
  dataThroughput: number = 145.7;
  activeSessions: number = 89;
  
  // Subscriptions
  private updateSubscription?: Subscription;
  
  // Chart data arrays
  private devicesData: number[] = [];
  private productionData: number[] = [];
  
  Math = Math; // Make Math available in template

  constructor(private router: Router) {}

  openDemoDialog(): void {
    this.router.navigate(['/contact-us'], { queryParams: { type: 'book-demo' } });
  }

  ngOnInit(): void {
    this.initializeChartData();
    this.updateCharts();
    this.calculateUptimeRing();
    
    // Simulate live data updates every 3 seconds
    this.updateSubscription = interval(3000).subscribe(() => {
      this.simulateLiveData();
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private initializeChartData(): void {
    // Initialize with random data for smooth charts
    this.devicesData = this.generateChartData(20, 140, 150);
    this.productionData = this.generateChartData(20, 2500, 3000);
  }

  private generateChartData(points: number, min: number, max: number): number[] {
    const data: number[] = [];
    for (let i = 0; i < points; i++) {
      data.push(min + Math.random() * (max - min));
    }
    return data;
  }

  private updateCharts(): void {
    // Convert data arrays to SVG polyline points
    this.devicesChartPoints = this.generatePolylinePoints(this.devicesData, 40);
    this.productionChartPoints = this.generatePolylinePoints(this.productionData, 40);
  }

  private generatePolylinePoints(data: number[], height: number): string {
    if (data.length === 0) return '';
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 100;
    const step = width / (data.length - 1);
    
    return data
      .map((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');
  }

  private calculateUptimeRing(): void {
    // Calculate stroke-dashoffset for circular progress
    const circumference = 2 * Math.PI * 45; // radius = 45
    const progress = this.uptimePercentage / 100;
    this.uptimeRingOffset = circumference * (1 - progress);
  }

  private simulateLiveData(): void {
    // Simulate active devices changes
    const deviceChange = Math.random() > 0.5 ? 1 : -1;
    this.activeDevices = Math.max(140, Math.min(150, this.activeDevices + deviceChange));
    
    // Update devices chart
    this.devicesData.shift();
    this.devicesData.push(this.activeDevices);
    
    // Simulate production rate changes
    const productionChange = (Math.random() - 0.5) * 200;
    this.productionRate = Math.round(Math.max(2500, Math.min(3200, this.productionRate + productionChange)));
    
    // Update production chart
    this.productionData.shift();
    this.productionData.push(this.productionRate);
    
    // Update charts
    this.updateCharts();
    
    // Simulate uptime changes (very stable)
    if (Math.random() > 0.95) {
      this.uptimePercentage = Math.max(99.0, Math.min(100, this.uptimePercentage + (Math.random() - 0.5) * 0.2));
      this.calculateUptimeRing();
    }
    
    // Simulate alerts changes
    if (Math.random() > 0.8) {
      this.activeAlerts = Math.max(0, Math.min(10, this.activeAlerts + (Math.random() > 0.6 ? 1 : -1)));
    }
    
    // Update ticker stats
    this.energyConsumption = Math.round(3000 + Math.random() * 1000);
    this.avgResponseTime = Math.round(20 + Math.random() * 10);
    this.dataThroughput = Math.round((140 + Math.random() * 20) * 10) / 10;
    this.activeSessions = Math.round(80 + Math.random() * 20);
    
    // Update trends
    this.devicesTrend = Math.round((Math.random() * 5) * 10) / 10;
    this.productionTrend = Math.round((Math.random() * 20) * 10) / 10;
    
    // Update timestamp
    this.lastUpdateTime = new Date();
  }

  testimonialItems = [
    {
      title: 'SAMA Web Server & Alerts at REMC Telangana',
      company_name: 'Hitachi Energy',
      description:
        'We confirm that M/s Supra Controls has successfully completed the work pertaining to Telangana REMC project and the systems are in operation without any failures.',
    },
    {
      title: 'CRUDE BLENDING & BOILER CONTROLS',
      company_name: 'PETRONAS PENAPISAN (MELAKA) SDN BHD',
      description:
        'With reference to the above work which you have completed last July 2000, we wish to express our appreciation for a job well done. I am sure you will be pleased to hear that the crude blending controls are now working very well.',
    },
    {
      title: 'UHN IOCL Bongaigaon LPG Unit',
      company_name: 'Fabtech',
      description:
        'Nice working with you in IOCL BGR and we are delighted to inform you that BGR project has been successfully completed.',
    },
  ];
}
