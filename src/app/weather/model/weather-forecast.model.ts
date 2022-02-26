import { DayForecast } from './dayForecast.model';

export class WeatherForecast {

    constructor(public cityName: string, public forecasts: DayForecast[]) { }
}