import { Injectable } from '@angular/core';
import { DayForecast } from '../model/dayForecast.model';
import { Condition } from '../model/condition.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  getConditionText(condition: Condition): string {
    return Condition[condition];
  }


  getWheatherImage(condition: Condition): string {
    const conditionName = Condition[condition];
    return `https://www.angulartraining.com/images/weather/${conditionName}.png`
  }
}
