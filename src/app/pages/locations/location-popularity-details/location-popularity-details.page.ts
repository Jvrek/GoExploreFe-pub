import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationPopularityDetailsService } from './location-popularity-details.service';
import * as Highcharts from 'highcharts';
import { IPopularityData } from './IPopularityData';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-location-popularity-details',
  templateUrl: './location-popularity-details.page.html',
  styleUrls: ['./location-popularity-details.page.scss']
})
export class LocationPopularityDetailsPage implements OnInit {
  private id;
  private chartData: IPopularityData[];
  private xAxis: string[];
  private data: number[];

  public options: Highcharts.Options = {
    chart: {
      type: 'scatter',
      height: 500,
      width: 390
    },
    title: {
      text: 'dane'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return this.y + ':' + this.x;
      }
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: ' '
      }
    },
    series: [
      {
        name: 'Godzina',
        type: 'line',
        data: []
      }
    ]
  };
  constructor(
    private popularityService: LocationPopularityDetailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initViewData();
    this.popularityService.getPopularity(this.id).subscribe((res) => {
      this.chartData = res;
      this.chartData.sort((a, b) => a.time.localeCompare(b.time));
      console.log(this.chartData);
      this.xAxis = this.chartData.map((data) => data.time);
      this.data = this.chartData.map((data) => data.amount);

      this.options.xAxis = {
        categories: this.xAxis
      };

      this.options.series = [
        {
          name: 'Godzina',
          type: 'line',
          data: this.data
        }
      ];

      Highcharts.chart('graph', this.options);
    });
  }

  ionViewDidLoad() {}

  private initViewData() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
