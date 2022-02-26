import { Injectable } from '@angular/core';
import { Condition } from '../model/condition.model';

/**
 * Encapsulates logic to obtain information related to the weather model classes, not really in the model itself
 *
 * @export
 * @class WeatherService
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  /**
   * Retrieves the text related to a weather condition
   *
   * @param {Condition} condition to convert to string
   * @return {*}  {string} that represents the condition
   * @memberof WeatherService
   */
  getConditionText(condition: Condition): string {
    return Condition[condition];
  }

  /**
   * Retrieves an url to an image that represents a condition
   *
   * @param {Condition} condition to get image url to
   * @return {*}  {string} url to the image
   * @memberof WeatherService
   */
  getWheatherImage(condition: Condition): string {
    const conditionName = Condition[condition];
    return `https://www.angulartraining.com/images/weather/${conditionName}.png`
  }
}
