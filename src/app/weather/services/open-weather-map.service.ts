import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherInfo } from '../model/weather-info.model';
import { ZipCode } from '../model/zipcode.model';
import { Temperatures } from '../model/temperatures.model';
import { Condition } from '../model/condition.model';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private static readonly API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private http: HttpClient) { }

  loadWeatherInfoFor(zipcode: ZipCode): Observable<WeatherInfo> {
    return this.http.get<any[]>(`${OpenWeatherMapService.BASE_URL}`, {
      params: {
        appid: OpenWeatherMapService.API_KEY,
        zip: `${zipcode.value},es`
      }
    }).pipe(map(weatherData => this.converToWeatherInfo(zipcode, weatherData)));
  }
  converToWeatherInfo(zipcode: ZipCode, weatherData: any): any {
    const location = weatherData.name;
    const currentTemperature = weatherData.main.temp;
    const minTemperature = weatherData.main.temp_min;
    const maxTemperature = weatherData.main.temp_max;
    const conditionName = weatherData.weather[0].main as string;
    const condition = this.convertStringToCondition(conditionName.toLowerCase());
    return new WeatherInfo(zipcode, location, condition,
      new Temperatures(currentTemperature, minTemperature, maxTemperature));
  }

  convertStringToCondition(condition: string): Condition {
    if (condition === "sunny") return Condition.sun;
    if (condition === "clear") return Condition.sun;
    if (condition === "clouds") return Condition.clouds;
    if (condition === "rain") return Condition.rain;
    if (condition === "snow") return Condition.snow;
    return Condition.unknown;
  }
}
