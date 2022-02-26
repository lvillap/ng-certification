import { Temperatures } from './temperatures.model';
import { Condition } from './condition.model';

/**
 * Forecast information for a day
 *
 * @export
 * @class DayForecast
 */
export class DayForecast {

    constructor(public day: Date, public temperatures: Temperatures, public currentCondition: Condition) { }
}