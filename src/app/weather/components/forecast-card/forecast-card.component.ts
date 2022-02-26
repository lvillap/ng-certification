import { Component, Input, OnInit } from '@angular/core';
import { DayForecast } from '../../model/dayForecast.model';
import { WeatherService } from '../../services/weather.service';

/**
 * Component that shows one day forecast information 
 *
 * @export
 * @class ForecastCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent implements OnInit {

  @Input() dayForecast: DayForecast;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
