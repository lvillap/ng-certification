import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { WeatherForecast } from '../../model/weather-forecast.model';
import { ZipCode } from '../../model/zipcode.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastPageService {

  currentZipCode: ZipCode;

  private readonly forecastSubject = new BehaviorSubject<WeatherForecast>(undefined);
  weatherForecast = this.forecastSubject.asObservable();

  constructor(private openWeatherMapService: OpenWeatherMapService) { }

  init(currentZipCode: ZipCode) {
    this.currentZipCode = currentZipCode;
    this.loadForecastFor(currentZipCode);
  }

  loadForecastFor(zipCode: ZipCode): void {
    this.openWeatherMapService.getForecastFor(zipCode).subscribe(
      forecast => this.forecastSubject.next(forecast));
  }
}
