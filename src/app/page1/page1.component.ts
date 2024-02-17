import { Component } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { ArchitectureInfo, Page1Service } from './page1.service';
 
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {



  architecturesInfo: ArchitectureInfo[];

  constructor(service: Page1Service) {
    this.architecturesInfo = service.getArchitecturesInfo();
    console.log(this.architecturesInfo);
  }

  
  updateInterval = 5000;

  yValue1 = 250; 
  yValue2 = 390;
  yValue3 = 260;
  yValue4 = 420;
  time = new Date();

  updateChart(count: number) {
    var step = 16; // Step size for incrementing or decrementing the values
    for (let i = 0; i < count; i++) {
      // Generate random values for increment/decrement
      const increment1 = Math.random() < 0.5 ? step : -step;
      const increment2 = Math.random() < 0.5 ? step : -step;
      const increment3 = Math.random() < 0.5 ? step : -step;
      const increment4 = Math.random() < 0.5 ? step : -step;
  
      // Update the values by adding the increments or decrements
      this.yValue1 = Math.round((this.yValue1 + increment1) * 100) / 100;
      this.yValue2 = Math.round((this.yValue2 + increment2) * 100) / 100;
      this.yValue3 = Math.round((this.yValue3 + increment3) * 100) / 100;
      this.yValue4 = Math.round((this.yValue4 + increment4) * 100) / 100;
  
      // Push the new values into the architecturesInfo array
      this.architecturesInfo.push({
        datetime: new Date().toLocaleTimeString(),
        smp: this.yValue1,
        mmp: this.yValue2,
        cnstl: this.yValue3,
        cluster: this.yValue4
      });
  
      // Reverse the increments for the next iteration
      step *= -1;
    }
  }
  
  


  ngAfterViewInit() {
    setInterval(() => {
      this.updateChart(1); 
    }, this.updateInterval);	
    } 


  // getChartInstance(chart: object) {
  // this.chart = chart;

  // this.updateChart(100);
  // }

  // updateInterval = 2000;

  // // initial value
  // yValue1 = 90; 
  // yValue2 = 97;
  // time = new Date();

  // updateChart = (count: any) => {
  // count = count || 1;
  // var deltaY1, deltaY2;
  // for (var i = 0; i < count; i++) {
  //   this.time.setTime(this.time.getTime()+ this.updateInterval);
  //   deltaY1 = .5 + Math.random() *(-.5-.5);
  //   deltaY2 = .5 + Math.random() *(-.5-.5);

  //   // adding random value and rounding it to two digits. 
  //   this.yValue1 = Math.round((this.yValue1 + deltaY1)*100)/100;
  //   this.yValue2 = Math.round((this.yValue2 + deltaY2)*100)/100;

  //   // pushing the new values
  //   this.dataPoints1.push({
  //   x: this.time.getTime(),
  //   y: this.yValue1
  //   });
  
  // }


  // ngAfterViewInit() {
  // setInterval(() => {
  //   this.updateChart(1); 
  // }, this.updateInterval);	
  // } 

}
