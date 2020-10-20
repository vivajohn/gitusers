import { Input, Component, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { Color } from 'ng2-charts';
import { UserModelService } from 'src/app/shared/services/user-model.service';

// Encapsulates code for the data chart
@Component({
  selector: 'gu-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.scss']
})
export class ActivityChartComponent {

  @Input() username?: string;

  // data for the chart
  dataPoints: ChartPoint[] = [];
  private offsets: { [key:number]: number} = {}; // offsets into dataPoints by month

  constructor(private model: UserModelService) { }

  /*** Setup for the chart ***/
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Activity' },
  ];
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          type: 'time',
          time: { unit: 'month' },
          distribution: 'series'
      }]
    },
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'yellow',
    },
  ];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];
  /*** End setup for the chart ***/


  ngAfterContentInit() {
    if (this.username) {
      this.initUser(this.username);
    }
  }

  // Initialize the array containing the data for the chart
  private initDates() {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() - 11;
    for(let i = 0; i < 12; i++) {
      const d = new Date(year, month + i);
      this.dataPoints[i] = { x: d, y: 0 };
      this.offsets[d.getMonth()] = i;
    }
  }

  private initUser(userName: string) {
    // Initialize data for the chart
    this.initDates();

    // For some reason the GitHub event data has duplicates.
    // We use this to recognize them.
    const actions: { [key: number]: boolean } = {};

    // Earliest acceptable date for the chart
    const d = this.dataPoints[0].x as Date;
    const start = d.getTime();

    // Get the data for the chart
    this.model.getActivity(userName).subscribe(list => {
      list.forEach(item => {
        if (!actions[item.id] && item.date.getTime() >= start) {
          actions[item.id] = true;
          const i = this.offsets[item.date.getMonth()];
          const value = this.dataPoints[i].y as number + item.count;
          this.dataPoints[i].y = value;
        }
      });
      this.trim();
    });
  }

  // Remove any leading months with zero activity
  private trim() {
    let i = 0;
    while (this.dataPoints[i].y as number === 0 && i < this.dataPoints.length-1) i++;
    let newCopy: ChartPoint[];
    if (i > 1) {
      newCopy = [...this.dataPoints.slice(i - 1)];
    } else {
      newCopy = [...this.dataPoints];
    }
    this.lineChartData[0].data = newCopy;
  }
}
