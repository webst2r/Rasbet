import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ApostasService} from "../../../services/apostas.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {Observable, switchMap, tap} from "rxjs";
import {ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexOptions, ApexTitleSubtitle} from "ng-apexcharts";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{

  loading = true;
  singleNull = false;
  multipleNull = false;


  chartSingleSeries: ApexNonAxisChartSeries = [];

  chartSingleTitle: ApexTitleSubtitle = {
    text: this.translate.instant("chart.singleTitle"),
    align: "center"
  };

  chartMultipleSeries: ApexNonAxisChartSeries = [];

  chartMultipleTitle: ApexTitleSubtitle = {
    text: this.translate.instant("chart.multipleTitle"),
    align: "center"
  }

  chartDetails: ApexChart = {
    type: "pie",
    toolbar:{
      show: false,
    },
  };

  chartLabels = [this.translate.instant("betState.WON"), this.translate.instant("betState.LOST")];

  colors = ['#1ba21b', '#b71414'];

  constructor(private apostasService: ApostasService,
              private auth: AuthenticationService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getSingleStatisticsValues().pipe(
        switchMap(() => this.getMultipleStatisticsValues())
    ).subscribe(() => this.loading = false)
  }

  getSingleStatisticsValues (): Observable<any> {
    return this.apostasService.getCountBetsbyUser(this.auth.getUserId()).pipe(
      tap(res => {
        if (res.won === 0 && res.lost === 0) {
          this.singleNull = true
        }
        this.chartSingleSeries.push(res.won);
        this.chartSingleSeries.push(res.lost);
      }));
  }

  getMultipleStatisticsValues(): Observable<any> {
    return this.apostasService.getMultipleCountBetsbyUser(this.auth.getUserId()).pipe(
      tap(res => {
        if (res.won === 0 && res.lost === 0) {
          this.multipleNull = true
        }
        this.chartMultipleSeries.push(res.won);
        this.chartMultipleSeries.push(res.lost);
      }));
  }

}

