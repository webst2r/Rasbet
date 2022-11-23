import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ApostasService} from "../../../services/apostas.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {tap} from "rxjs";

import {ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle} from "ng-apexcharts";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  chartSingleSeries: ApexNonAxisChartSeries = [];

  chartSingleTitle: ApexTitleSubtitle = {
    text: "Single Bets Statistics",
    align: "center"
  };

  chartMultipleSeries: ApexNonAxisChartSeries = [];

  chartMultipleTitle: ApexTitleSubtitle = {
    text: "Multiple Bets Statistics",
    align: "center"
  }

  chartDetails: ApexChart = {
    type: "pie",
    toolbar:{
      show: true
    }
  };

  chartLabels = ["Won", "Lost"];

  constructor(private apostasService: ApostasService,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getSingleStatisticsValues();
    this.getMultipleStatisticsValues();
  }

  getSingleStatisticsValues (): void {
    this.apostasService.getCountBetsbyUser(this.auth.getUserId()).pipe(
      tap(res => {
        this.chartSingleSeries.push(res.won);
        this.chartSingleSeries.push(res.lost);
      })).subscribe(res => console.log("Single: " + "WON: " + res.won, "LOST: " + res.lost + " Series: " + this.chartSingleSeries));
  }

  getMultipleStatisticsValues(): void {
    this.apostasService.getMultipleCountBetsbyUser(this.auth.getUserId()).pipe(
      tap(res => {
        this.chartMultipleSeries.push(res.won);
        this.chartMultipleSeries.push(res.lost);
      })).subscribe(res => console.log("Multiplas: " + "WON: "+ res.won, "LOST: " + res.lost + " Series: " + this.chartMultipleSeries));
  }

}

