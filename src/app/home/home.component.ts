import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** A customer quote. `points` / `closing` are only used where the source
 *  letter has a numbered list, so it can be reproduced as written. */
interface DashboardSlide {
  id: string;
  label: string;
  caption: string;
  src: string;
}

interface Testimonial {
  title: string;
  company_name: string;
  logo: string;
  description: string;
  points?: string[];
  closing?: string;
}

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
export class HomeComponent  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('dashVideo') dashVideos!: QueryList<ElementRef<HTMLVideoElement>>;

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

  Math = Math;

  // ── Dashboard preview carousel ──
  readonly slides: DashboardSlide[] = [
    
    {
      id: 'webreports',
      label: 'Reporter Dashboard',
      caption: 'Scheduled web reports and dashboards generated straight from the historian',
      src: 'assets/images/webreportszoom1.mp4'
    },
    {
      id: 'alarm',
      label: 'Alarm Dashboard',
      caption: 'Live alarm rationalisation, flood analysis and KPIs to EEMUA 191 / ISA 18.2',
      src: 'assets/images/alarm_dashboard.mp4'
    },
    {
      id: 'syslog',
      label: 'SYSLOG Dashboard',
      caption: 'Browser-based trends, faceplates and live plant mimics on any device',
      src: 'assets/images/SyslogDashboard.mp4'
    }
  ];

  /** Longest a slide may sit on screen. A clip shorter than this still
   *  advances the moment it ends; a longer one (or one that never plays)
   *  is cut off here so the carousel always keeps moving. */
  private readonly SLIDE_MAX_MS = 12000;

  /** Index of the slide currently on screen. */
  activeIndex = 0;
  /** 0-100 — playback position of the active clip, drives the pill fill. */
  progress = 0;
  private autoplayPaused = false;
  private touchStartX = 0;
  kamudiMapUrl: SafeResourceUrl;

  // ── Capacity (monthly) ──
  readonly BASE_CAPACITY = 227;
  capacityMW: number = 227.24;
  capacityTrend: number = 4.2;
  capacityMonth: string = '';
  capacityChartPoints: string = '';
  private capacityHistory: number[] = [];
  private monthlySubscription?: Subscription;

  private readonly MONTH_NAMES = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.kamudiMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.openstreetmap.org/export/embed.html?bbox=78.3400%2C9.3900%2C78.4100%2C9.4600&layer=mapnik'
    );
  }

  openDemoDialog(): void {
    this.router.navigate(['/contact-us'], { queryParams: { type: 'book-demo' } });
  }

  ngOnInit(): void {
    this.initializeChartData();
    this.initCapacity();
    this.updateCharts();
    this.calculateUptimeRing();

    // Live data — every 3s
    this.updateSubscription = interval(3000).subscribe(() => {
      this.simulateLiveData();
    });

    // Monthly capacity refresh — every 30s in demo (represents 1 month)
    this.monthlySubscription = interval(30000).subscribe(() => {
      this.refreshMonthlyCapacity();
    });

    // Slides don't rotate on a timer — each clip plays to the end and the
    // (ended) handler advances the carousel. See onVideoEnded().
  }


  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
    this.monthlySubscription?.unsubscribe();
    clearTimeout(this.fallbackTimer);
  }

  private initCapacity(): void {
    const now = new Date();
    this.capacityMonth = this.MONTH_NAMES[now.getMonth()];

    // Build 12-month history ending at current month
    this.capacityHistory = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      // Seasonal variation: peak in summer (Apr–Jun), dip in monsoon (Jul–Sep)
      const month = d.getMonth();
      const seasonal = Math.sin((month - 2) * Math.PI / 6) * 8;
      const val = this.BASE_CAPACITY + seasonal + (Math.random() - 0.5) * 4;
      this.capacityHistory.push(Math.round(val * 100) / 100);
    }

    this.capacityMW = this.capacityHistory[11];
    const prev = this.capacityHistory[10];
    this.capacityTrend = Math.round(((this.capacityMW - prev) / prev) * 1000) / 10;
    this.capacityChartPoints = this.generatePolylinePoints(this.capacityHistory, 40);
  }

  private refreshMonthlyCapacity(): void {
    const now = new Date();
    // Advance to next month in the sequence
    const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    this.capacityMonth = this.MONTH_NAMES[lastDate.getMonth()];

    const month = lastDate.getMonth();
    const seasonal = Math.sin((month - 2) * Math.PI / 6) * 8;
    const newVal = this.BASE_CAPACITY + seasonal + (Math.random() - 0.5) * 4;
    const newCapacity = Math.round(newVal * 100) / 100;

    const prev = this.capacityMW;
    this.capacityTrend = Math.round(((newCapacity - prev) / prev) * 1000) / 10;
    this.capacityMW = newCapacity;

    this.capacityHistory.shift();
    this.capacityHistory.push(newCapacity);
    this.capacityChartPoints = this.generatePolylinePoints(this.capacityHistory, 40);
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

  testimonialItems: Testimonial[] = [
    {
      title: 'SAMA Web Server & Alerts at REMC Telangana',
      company_name: 'Hitachi Energy',
      logo: 'assets/customers/tstransco.png',
      description:
        'We confirm that M/s Supra Controls has successfully completed the work pertaining to Telangana REMC project and the systems are in operation without any failures.',
    },
    {
      title: 'CRUDE BLENDING & BOILER CONTROLS',
      company_name: 'PETRONAS PENAPISAN (MELAKA) SDN BHD',
      logo: 'assets/customers/petronas.png',
      description:
        'With reference to the above work which you have completed last July 2000, we wish to express our appreciation for a job well done. I am sure you will be pleased to hear that the crude blending controls are now working very well.',
    },
    {
      title: 'UHN IOCL Bongaigaon LPG Unit',
      company_name: 'Fabtech',
      logo: 'assets/customers/IndianOilLogo1024x768.png',
      description:
        'Nice working with you in IOCL BGR and we are delighted to inform you that BGR project has been successfully completed.',
    },
    {
      title: 'SAMA Alarm Management System',
      company_name: 'Dangote Petroleum Refinery & Petrochemicals FZE',
      logo: 'assets/customers/Dangote.png',
      // Quoted verbatim from the customer letter — wording left exactly as written.
      description:
        '4 sets of Supra SAMA Alarm Management Software, along with an Entreprise server, were supplied as part of the DCS package, through Schneider Electric, India, to Dangote Petroleum Refinery & Petrochemicals FZE. The supplied software package has the following features. 4 local AIMS system, connected to DCS and the Entreprise server, handling about 300,000 tags, without any delay. 12 triconex sOE systems connected and, multiple SRRs , Analytics as per EEUMA 1912 & ISA 18.2 has been implemented.',
   
      closing:
        'This software was commissioned on 24th October, 2024 and, it has been performing satisfactorily.',
    },
  ];

  /** Only the visible clip and the one after it are worth fetching up front —
   *  five hero videos loading at once would stall the rest of the page. The
   *  rest load on demand when playActiveVideo() calls load(). */
  preloadFor(index: number): string {
    const next = (this.activeIndex + 1) % this.slides.length;
    return index === this.activeIndex || index === next ? 'auto' : 'none';
  }

  /** Track offset — one slide per 100% of the viewport width. */
  get trackTransform(): string {
    return `translate3d(-${this.activeIndex * 100}%, 0, 0)`;
  }

  goToSlide(index: number): void {
    const count = this.slides.length;
    this.activeIndex = ((index % count) + count) % count;
    this.progress = 0;
    this.playActiveVideo();
  }

  nextSlide(): void { this.goToSlide(this.activeIndex + 1); }
  prevSlide(): void { this.goToSlide(this.activeIndex - 1); }

  /** Fill the pill in step with the clip so the wait is visible. */
  onTimeUpdate(event: Event, index: number): void {
    if (index !== this.activeIndex) { return; }
    const v = event.target as HTMLVideoElement;
    if (!isFinite(v.duration) || v.duration <= 0) { return; }
    // Measure against however long this slide will actually stay up, so the
    // bar reaches the end exactly as the carousel moves on.
    const span = Math.min(v.duration, this.SLIDE_MAX_MS / 1000);
    this.progress = Math.min(100, (v.currentTime / span) * 100);
  }

  /** Hold the current slide while the pointer is over it. */
  pauseAutoplay(): void {
    this.autoplayPaused = true;
    clearTimeout(this.fallbackTimer);
    this.currentVideo?.pause();
  }

  resumeAutoplay(): void {
    if (!this.autoplayPaused) { return; }
    this.autoplayPaused = false;
    const v = this.currentVideo;
    if (v) {
      v.muted = true;
      v.play().catch(() => { /* autoplay refused — watchdog still rotates */ });
      this.armWatchdog(v);
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  /** Swipe left / right to change slide; ignore small drags and taps. */
  onTouchEnd(event: TouchEvent): void {
    const dx = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) < 45) { return; }
    if (dx < 0) { this.nextSlide(); } else { this.prevSlide(); }
  }

  private get currentVideo(): HTMLVideoElement | undefined {
    return this.dashVideos?.toArray()[this.activeIndex]?.nativeElement;
  }

  private fallbackTimer?: any;

ngAfterViewInit(): void {
  // Belt and braces: force the muted PROPERTY so autoplay isn't blocked.
  this.dashVideos.forEach(ref => {
    ref.nativeElement.muted = true;
    ref.nativeElement.defaultMuted = true;
  });
  this.dashVideos.changes.subscribe(() => this.playActiveVideo());
  this.playActiveVideo();
}

private playActiveVideo(): void {
  clearTimeout(this.fallbackTimer);

  setTimeout(() => {
    const videos = this.dashVideos?.toArray() ?? [];
    const active = this.activeIndex;

    videos.forEach((ref, i) => {
      const v = ref.nativeElement;

      if (i !== active) {
        v.pause();
        return;
      }

      v.muted = true;

      const start = () => {
        try { v.currentTime = 0; } catch { /* not seekable yet */ }
        v.play().catch(() => { /* autoplay refused — watchdog still rotates */ });
        this.armWatchdog(v);
      };

      // readyState >= 2 means we have a current frame; safe to seek + play.
      if (v.readyState >= 2) {
        start();
      } else {
        v.addEventListener('loadeddata', start, { once: true });
        v.load();          // force a fetch if preload never kicked in
        this.armWatchdog(v); // cover the case where the file 404s
      }
    });
  });
}

/** If `ended` never fires (blocked autoplay, missing file, decode error),
 *  advance anyway so the carousel doesn't stall on one slide. */
private armWatchdog(v: HTMLVideoElement): void {
  clearTimeout(this.fallbackTimer);
  if (this.autoplayPaused) { return; }
  const clip = isFinite(v.duration) && v.duration > 0
    ? v.duration * 1000 + 400   // let `ended` fire first for a normal clip
    : this.SLIDE_MAX_MS;        // duration unknown — fall back to the cap
  this.fallbackTimer = setTimeout(() => this.nextSlide(), Math.min(clip, this.SLIDE_MAX_MS));
}

onVideoEnded(index?: number): void {
  // Ignore `ended` bubbling up from a slide that isn't on screen.
  if (index !== undefined && index !== this.activeIndex) { return; }
  this.nextSlide();
}

  /** Two cards render — the third grid column is the call-to-action cell. */
  get visibleTestimonials() {
    return this.testimonialItems.slice(0, 4);
  }

  /** Hide the logo slot if the image file is missing, rather than showing a broken icon. */
  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.closest('.testimonial-logo')?.remove();
  }


}
