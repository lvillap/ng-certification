import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from '../../model/weather-info.model';
import { ZipCode } from '../../model/zipcode.model';
import { WeatherService } from '../../services/weather.service';

/**
 * Component that renders a card with weather information for a zip code
 *
 * @export
 * @class ZipCodeWeatherCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-zip-code-weather-card',
  templateUrl: './zip-code-weather-card.component.html',
  styleUrls: ['./zip-code-weather-card.component.css']
})
export class ZipCodeWeatherCardComponent implements OnInit {

  @Input() weatherInfo: WeatherInfo | undefined;
  @Output() removeZipCode = new EventEmitter<ZipCode>();

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  /**
   * Returns the name of the weather condition
   *
   * @return {*}  {string} name of the condition
   * @memberof ZipCodeWeatherCardComponent
   */
  getCurrentConditionText(): string {
    return this.weatherService.getConditionText(this.weatherInfo?.currentCondition);
  }

  /**
   * Launches a signal indicating the zip code must be removed
   *
   * @memberof ZipCodeWeatherCardComponent
   */
  emitRemoveZipCode(): void {
    this.removeZipCode.emit(this.weatherInfo?.zipCode);
  }

  /**
   * Returns the url needed to navigate to the forecast of the zip code
   *
   * @param {ZipCode} zipCode to get url to
   * @return {*}  {string} url to navigate to
   * @memberof ZipCodeWeatherCardComponent
   */
  getForecastUrlFor(zipCode: ZipCode): string {
    return `/forecast/${zipCode.country}/${zipCode.value}`;
  }
}
