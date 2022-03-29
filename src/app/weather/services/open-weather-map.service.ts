import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherInfo } from '../model/weather-info.model';
import { ZipCode } from '../model/zipcode.model';
import { Temperatures } from '../model/temperatures.model';
import { Condition } from '../model/condition.model';
import { WeatherForecast } from '../model/weather-forecast.model';
import { DayForecast } from '../model/dayForecast.model';

/**
 * Service that encapsulates logic to access the OpenWeatherMap API
 *
 * @export
 * @class OpenWeatherMapService
 */
@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';
  private static readonly API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';

  /**
   * Params that must be passed in all calls to the API
   *
   * @private
   * @static
   * @memberof OpenWeatherMapService
   */
  private static readonly DEFAULT_PARAMS = {
    appid: OpenWeatherMapService.API_KEY,
    units: 'metric'
  };

  /**
   * Object that maps condition names to Condition values
   *
   * @private
   * @static
   * @memberof OpenWeatherMapService
   */
  private static readonly NAME_TO_CONDITION_MAP = {
    sunny: Condition.sun,
    clear: Condition.sun,
    clouds: Condition.clouds,
    rain: Condition.rain,
    snow: Condition.snow,
  }

  constructor(private http: HttpClient) { }

  /**
   * Retrieves an observable to the operation needed to load weather info for a zip code
   *
   * @param {ZipCode} zipCode to retrieve weather information for
   * @return {*}  {Observable<WeatherInfo>} to the operation
   * @memberof OpenWeatherMapService
   */
  loadWeatherInfoFor(zipCode: ZipCode): Observable<WeatherInfo> {
    return this.http.get<any[]>(`${OpenWeatherMapService.BASE_URL}weather`, {
      params: {
        ...OpenWeatherMapService.DEFAULT_PARAMS,
        zip: `${zipCode.value},${zipCode.country}`,
      }
    }).pipe(map(data => this.converToWeatherInfo(zipCode, data)));
  }

  /**
   * Retrieves an observable to the operation needed to get the forecast for a zip code
   *
   * @param {ZipCode} zipCode to retrieve forecast information for
   * @return {*}  {Observable<WeatherForecast>} to the operation
   * @memberof OpenWeatherMapService
   */
  getForecastFor(zipCode: ZipCode): Observable<WeatherForecast> {
    return this.http.get<any>(`${OpenWeatherMapService.BASE_URL}forecast`, {
      params: {
        ...OpenWeatherMapService.DEFAULT_PARAMS,
        zip: `${zipCode.value},${zipCode.country}`,
      }
    }).pipe(map(data => this.converListOfWeatherForecasts(zipCode, data)));
  }

  /**
   * Converts API data for weather forecast to a WeatherForecast model object
   *
   * @private
   * @param {ZipCode} zipCode the information belongs to
   * @param {*} weatherForecastData API data to convert
   * @return {*}  {WeatherForecast} model object obtained
   * @memberof OpenWeatherMapService
   */
  private converListOfWeatherForecasts(zipCode: ZipCode, weatherForecastData: any): WeatherForecast {
    const cityName = weatherForecastData.city.name;
    const forecasts: DayForecast[] = [];
    weatherForecastData.list.forEach(oneForecast => forecasts.push(this.convertOneForecast(oneForecast)));
    return new WeatherForecast(cityName, forecasts);
  }

  /**
   * Converts API data for a day weather forecast to a DayForecast model object
   *
   * @private
   * @param {*} oneForecast API data to convert
   * @return {*}  {DayForecast} model object obtained
   * @memberof OpenWeatherMapService
   */
  private convertOneForecast(oneForecast: any): DayForecast {
    const date = this.converDate(oneForecast.dt);
    const temperatures = this.converMainToTemperatures(oneForecast.main);
    const condition = this.convertArrayOfWeatherToCondition(oneForecast.weather);
    return new DayForecast(date, temperatures, condition);
  }

  /**
   * Converts the OpenWeatherMap API date format to a Date
   *
   * @private
   * @param {*} dt date information in API format
   * @return {*} {Date} obtained
   * @memberof OpenWeatherMapService
   */
  private converDate(dt: any): Date {
    return new Date(dt * 1000);
  }

  /**
   * Converts API data for weather information to a WeatherInfo model object
   *
   * @private
   * @param {ZipCode} zipcode the information belongs to
   * @param {*} weatherData API data to convert
   * @return {*}  {WeatherInfo} model object obtained
   * @memberof OpenWeatherMapService
   */
  private converToWeatherInfo(zipcode: ZipCode, weatherData: any): WeatherInfo {
    const location = weatherData.name;
    const temperatures = this.converMainToTemperatures(weatherData.main);
    const condition = this.convertArrayOfWeatherToCondition(weatherData.weather);
    return new WeatherInfo(zipcode, location, condition, temperatures);
  }

  /**
   * Converts API data for temperatures struct to a Temperatures model object
   *
   * @private
   * @param {*} temperaturesData API data to convert
   * @return {*}  {Temperatures} model object obtained
   * @memberof OpenWeatherMapService
   */
  private converMainToTemperatures(temperaturesData: any): Temperatures {
    const currentTemperature = temperaturesData.temp;
    const minTemperature = temperaturesData.temp_min;
    const maxTemperature = temperaturesData.temp_max;
    return new Temperatures(currentTemperature, minTemperature, maxTemperature);
  }

  /**
   * Converts API data for weather to a Condition model object
   *
   * @private
   * @param {any[]} weather API data to convert
   * @return {*}  {Condition} model object obtained
   * @memberof OpenWeatherMapService
   */
  private convertArrayOfWeatherToCondition(weather: any[]): Condition {
    const conditionName = weather[0].main as string;
    const condition = this.convertStringToCondition(conditionName.toLowerCase());
    return condition;
  }

  /**
   * Converts a condition name to a Condition model object
   *
   * @private
   * @param {string} conditionName to convert to name
   * @return {*}  {Condition} represented by the condition name
   * @memberof OpenWeatherMapService
   */
  private convertStringToCondition(conditionName: string): Condition {
    conditionName = conditionName.toLowerCase();
    const conditionInMap = OpenWeatherMapService.NAME_TO_CONDITION_MAP[conditionName];
    return conditionInMap === undefined ? Condition.unknown : conditionInMap;
  }
}
