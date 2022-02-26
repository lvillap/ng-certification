import { Temperatures } from './temperatures.model';
import { Condition } from './condition.model';

export class DayForecast {

    constructor(public day: Date, public temperatures: Temperatures, public currentCondition: Condition) { }
}