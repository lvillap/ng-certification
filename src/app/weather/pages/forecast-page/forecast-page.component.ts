import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastPageService } from './forecast-page.service';
import { ZipCode } from '../../model/zipcode.model';
import { WeatherForecast } from '../../model/weather-forecast.model';
import { DatesService } from '../../../shared/dates/dates.service';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.css']
})
export class ForecastPageComponent implements OnInit {

  forecast: WeatherForecast | undefined;

  constructor(private activatedRoute: ActivatedRoute, private service: ForecastPageService, 
    private router: Router, private datesService: DatesService) { }

  ngOnInit(): void {
    const currentZipCode = this.getZipCodeToShow();
    this.subscribeToChangesInForecast();
    this.service.init(new ZipCode({ value: currentZipCode }));
  }

  navigateToZipCodes(): void {
    this.router.navigateByUrl("");
  }

  private subscribeToChangesInForecast() {
    this.service.weatherForecast.subscribe(forecast => this.forecast = this.filterRepeatedDays(forecast));
  }

  private filterRepeatedDays(forecast: WeatherForecast): WeatherForecast {
    const filteredList = [];
    let previousDay = undefined;
    forecast.forecasts.forEach(forecast => {
      if (previousDay !== undefined && this.datesService.sameDay(previousDay, forecast.day)) {
        return;
      }
      filteredList.push(forecast);
      previousDay = forecast.day;
    });
    return new WeatherForecast(forecast.cityName, filteredList);
  }

  private getZipCodeToShow(): string {
    return this.activatedRoute.snapshot.params['zipcode'];
  }
}
