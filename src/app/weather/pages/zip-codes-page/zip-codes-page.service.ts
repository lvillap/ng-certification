import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { ZipCode } from '../../model/zipcode.model';
import { OpenWeatherMapService } from 'app/weather/services/open-weather-map.service';
import { ZipCodesLocalstorageService } from '../../services/zip-codes-localstorage.service';
import { ZipCodesWeatherList } from 'app/weather/model/zip-codes-weather-list.model';

// TODO Emplear equals en ZipCode

@Injectable({
  providedIn: 'root'
})
export class ZipCodesPageService {

  private weatherList = new ZipCodesWeatherList();
  zipCodesWeatherInfo = this.weatherList.asObservable();
  private errorSubject = new BehaviorSubject<string>("");
  error = this.errorSubject.asObservable();

  constructor(private openWeatherMapService: OpenWeatherMapService, private zipCodes: ZipCodesLocalstorageService) { }

  init(): void {
    this.loadZipCodesAnRetrieveWeather();
  }

  loadZipCodesAnRetrieveWeather() {
    this.zipCodes.getCurrentZipCodes().forEach(zipCode => 
      this.addWeatherFor(new ZipCode({ value: zipCode })));
  }

  // FIXME No meter el zip code si no hay datos en openWeatherMap
  registerZipCode(zipcode: ZipCode) {
    if (this.zipCodes.alreadyRegistered(zipcode)) return;
    this.zipCodes.add(zipcode);
    this.addWeatherFor(zipcode);
  }

  removeZipCode(zipcode: ZipCode): void {
    this.zipCodes.remove(zipcode);
    this.weatherList.remove(zipcode);
  }

  private addWeatherFor(zipcode: ZipCode): void {
    this.openWeatherMapService.loadWeatherInfoFor(zipcode).pipe(catchError(error => {
      const errorMessage = error.error instanceof ErrorEvent ?
        `Error: ${error.error.message}` : `Error: ${error.message}`;
      this.errorSubject.next(errorMessage);
      return of(undefined);
    }))
      .subscribe(weatherInfo => {
        if (!weatherInfo) return;
        this.errorSubject.next(undefined);
        this.weatherList.insert(weatherInfo);
      });
  }
}
