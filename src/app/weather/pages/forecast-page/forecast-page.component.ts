import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastPageService } from './forecast-page.service';
import { ZipCode } from '../../model/zipcode.model';
import { WeatherForecast } from '../../model/weather-forecast.model';
import { DatesService } from '../../../shared/dates/dates.service';
import { Subscription } from 'rxjs';

/**
 * Component that encapsulates the page where forecast of a zip code is shown
 *
 * @export
 * @class ForecastPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.css']
})
export class ForecastPageComponent implements OnInit, OnDestroy {

  forecast: WeatherForecast | undefined;
  changesInForecastSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private service: ForecastPageService, 
    private router: Router, private datesService: DatesService) { }

  ngOnInit(): void {
    const currentZipCode = this.getZipCodeToShow();
    this.subscribeToChangesInForecast();
    this.service.init(currentZipCode);
  }

  /**
   * Navigates to the zip codes page
   *
   * @memberof ForecastPageComponent
   */
  navigateToZipCodes(): void {
    this.router.navigateByUrl("");
  }

  ngOnDestroy(): void {
    if (this.changesInForecastSubscription) this.changesInForecastSubscription.unsubscribe();
  }

  /**
   * Subscribes the component to the weather forecast information in the service
   *
   * @private
   * @memberof ForecastPageComponent
   */
  private subscribeToChangesInForecast() {
    this.changesInForecastSubscription = this.service.weatherForecast.subscribe(forecast => this.forecast = this.filterRepeatedDays(forecast));
  }

  /**
   * Removes all information that is referent to the same day, leaving only different days
   *
   * @private
   * @param {WeatherForecast} forecast information
   * @return {*}  {WeatherForecast} with info only for different days
   * @memberof ForecastPageComponent
   */
  private filterRepeatedDays(forecast: WeatherForecast): WeatherForecast {
    if (!forecast) return new WeatherForecast("", []);
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

  /**
   * Return the zip code to show in this page
   *
   * @private
   * @return {*}  {string} zip code to show
   * @memberof ForecastPageComponent
   */
  private getZipCodeToShow(): ZipCode {
    const params = this.activatedRoute.snapshot.params;
    return new ZipCode(params['zipcode'], params['country']);
  }
}
