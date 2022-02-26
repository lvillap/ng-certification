import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherInfo } from 'app/weather/model/weather-info.model';
import { ZipCodesPageService } from 'app/weather/pages/zip-codes-page/zip-codes-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zip-codes-page',
  templateUrl: './zip-codes-page.component.html',
  styleUrls: ['./zip-codes-page.component.css']
})
export class ZipCodesPageComponent implements OnInit {

  constructor(public service: ZipCodesPageService) { }

  ngOnInit(): void {
    this.service.init();
  }
}
