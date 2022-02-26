import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { WeatherForecast } from '../../model/weather-forecast.model';
import { ZipCode } from '../../model/zipcode.model';

/**
 * Service that contains business logic and data for the forecast page
 *
 * @export
 * @class ForecastPageService
 */
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

  /**
   * Loads the forecast information for a zip code
   *
   * @param {ZipCode} zipCode to get the forecast for
   * @memberof ForecastPageService
   */
  loadForecastFor(zipCode: ZipCode): void {
    this.openWeatherMapService.getForecastFor(zipCode).subscribe(
      forecast => this.forecastSubject.next(forecast));
  }
}
