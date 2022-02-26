import { DayForecast } from './dayForecast.model';

/**
 * Class that encapsulates data referent to the forecast referent to a city
 *
 * @export
 * @class WeatherForecast
 */
export class WeatherForecast {

    constructor(public cityName: string, public forecasts: DayForecast[]) { }
}