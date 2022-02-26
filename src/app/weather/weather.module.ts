import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ZipCodeFormComponent } from './components/zip-code-form/zip-code-form.component';
import { ZipCodeWeatherCardComponent } from './components/zip-code-weather-card/zip-code-weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { ZipCodesPageComponent } from './pages/zip-codes-page/zip-codes-page.component';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Weather2RoutingModule as WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  declarations: [
    ZipCodeFormComponent,
    ZipCodeWeatherCardComponent,
    ForecastCardComponent,
    ZipCodesPageComponent,
    ForecastPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    WeatherRoutingModule
  ],
  exports: [
    ZipCodesPageComponent,
    ForecastPageComponent
  ]
})
export class WeatherModule { }
