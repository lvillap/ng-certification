import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherInfo } from '../model/weather-info.model';
import { ZipCode } from '../model/zipcode.model';
import { Temperatures } from '../model/temperatures.model';
import { Condition } from '../model/condition.model';
import { WeatherForecast } from '../model/weather-forecast.model';
import { DayForecast } from '../model/dayForecast.model';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';
  private static readonly API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';

  private static readonly NAME_TO_CONDITION_MAP = {
    sunny: Condition.sun,
    clear: Condition.sun,
    clouds: Condition.clouds,
    rain: Condition.rain,
    snow: Condition.snow,
  }

  constructor(private http: HttpClient) { }

  loadWeatherInfoFor(zipcode: ZipCode): Observable<WeatherInfo> {
    return this.http.get<any[]>(`${OpenWeatherMapService.BASE_URL}weather`, {
      params: {
        appid: OpenWeatherMapService.API_KEY,
        zip: `${zipcode.value},es`,
        units: 'metric'
      }
    }).pipe(map(data => this.converToWeatherInfo(zipcode, data)));
  }

  getForecastFor(zipCode: ZipCode): Observable<WeatherForecast> {
    return this.http.get<any>(`${OpenWeatherMapService.BASE_URL}forecast`, {
      params: {
        appid: OpenWeatherMapService.API_KEY,
        zip: `${zipCode.value},es`,
        units: 'metric'
      }
    }).pipe(map(data => this.converListOfWeatherForecasts(zipCode, data)));
  }

  private converListOfWeatherForecasts(zipCode: ZipCode, weatherForecastData: any): WeatherForecast {
    const cityName = weatherForecastData.city.name;
    const forecasts: DayForecast[] = [];
    weatherForecastData.list.forEach(oneForecast => forecasts.push(this.convertOneForecast(oneForecast)));
    return new WeatherForecast(cityName, forecasts);
  }
  private convertOneForecast(oneForecast: any): DayForecast {
    const date = new Date(oneForecast.dt);
    const temperatures = this.converMainToTemperatures(oneForecast.main);
    const condition = this.convertArrayOfWeatherToCondition(oneForecast.weather);
    return new DayForecast(date, temperatures, condition);
  }

  private converToWeatherInfo(zipcode: ZipCode, weatherData: any): any {
    const location = weatherData.name;
    const temperatures = this.converMainToTemperatures(weatherData.main);
    const condition = this.convertArrayOfWeatherToCondition(weatherData.weather);
    return new WeatherInfo(zipcode, location, condition, temperatures);
  }

  private converMainToTemperatures(main: any): Temperatures {
    const currentTemperature = main.temp;
    const minTemperature = main.temp_min;
    const maxTemperature = main.temp_max;
    return new Temperatures(currentTemperature, minTemperature, maxTemperature);
  }

  private convertArrayOfWeatherToCondition(weather: any[]): Condition {
    const conditionName = weather[0].main as string;
    const condition = this.convertStringToCondition(conditionName.toLowerCase());
    return condition;
  }

  private convertStringToCondition(condition: string): Condition {
    const conditionName = condition.toLowerCase();
    const conditionInMap = OpenWeatherMapService.NAME_TO_CONDITION_MAP[conditionName];
    return conditionInMap === undefined ? Condition.unknown : conditionInMap;
  }
}
