import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Condition } from 'app/weather/model/condition.model';
import { WeatherInfo } from '../../model/weather-info.model';
import { ZipCode } from '../../model/zipcode.model';

@Component({
  selector: 'app-zip-code-weather-card',
  templateUrl: './zip-code-weather-card.component.html',
  styleUrls: ['./zip-code-weather-card.component.css']
})
export class ZipCodeWeatherCardComponent implements OnInit {

  @Input() weatherInfo: WeatherInfo | undefined;
  @Output() removeZipCode = new EventEmitter<ZipCode>();

  constructor() { }

  ngOnInit(): void {
  }

  getWheatherImage(): string {
    const conditionName = Condition[this.weatherInfo.currentCondition];
    return `https://www.angulartraining.com/images/weather/${conditionName}.png`
  }

  getCurrentConditionText(): string {
    return Condition[this.weatherInfo?.currentCondition];
  }

  emitRemoveZipCode(): void {
    this.removeZipCode.emit(this.weatherInfo?.zipCode);
  }

}
