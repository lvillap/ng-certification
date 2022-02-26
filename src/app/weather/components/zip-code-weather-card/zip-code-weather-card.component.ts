import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherInfo } from '../../model/weather-info.model';
import { ZipCode } from '../../model/zipcode.model';
import { WeatherService } from '../../services/weather.service';
import { Condition } from '../../model/condition.model';

@Component({
  selector: 'app-zip-code-weather-card',
  templateUrl: './zip-code-weather-card.component.html',
  styleUrls: ['./zip-code-weather-card.component.css']
})
export class ZipCodeWeatherCardComponent implements OnInit {

  @Input() weatherInfo: WeatherInfo | undefined;
  @Output() removeZipCode = new EventEmitter<ZipCode>();

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getCurrentConditionText(): string {
    return Condition[this.weatherInfo?.currentCondition];
  }

  emitRemoveZipCode(): void {
    this.removeZipCode.emit(this.weatherInfo?.zipCode);
  }

  getForecastUrlFor(zipCode: ZipCode): string {
    return `/forecast/${zipCode.value}`;
  }
}
