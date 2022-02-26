import { Temperatures } from './temperatures.model';
import { ZipCode } from './zipcode.model';
import { Condition } from './condition.model';

/**
 * Weather information for a zip code
 *
 * @export
 * @class WeatherInfo
 */
export class WeatherInfo {

    constructor(public zipCode: ZipCode, public location: string, public currentCondition: Condition, public temperatures: Temperatures) {
    }

}