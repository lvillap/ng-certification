import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, zip } from 'rxjs';
import { ZipCode } from '../../model/zipcode.model';
import { WeatherInfo } from '../../model/weather-info.model';
import { OpenWeatherMapService } from 'app/weather/services/open-weather-map.service';
import { Validators } from '@angular/forms';
import { ZipCodesLocalstorageService } from '../../services/zip-codes-localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ZipCodesPageService {

  private zipCodesWeatherInfoSubject = new BehaviorSubject<WeatherInfo[]>([]);
  zipCodesWeatherInfo = this.zipCodesWeatherInfoSubject.asObservable();
  private errorSubject = new BehaviorSubject<string>("");
  error = this.errorSubject.asObservable();

  constructor(private openWeatherMapService: OpenWeatherMapService, private zipCodesStorage: ZipCodesLocalstorageService) { }

  init(): void {
    this.loadZipCodes();
  }

  loadZipCodes() {
    this.zipCodesStorage.getCurrentZipCodes().forEach(zipCode => this.addZipCode(new ZipCode({ value: zipCode })));
  }

  registerZipCode(zipcode: ZipCode) {
    if (this.zipCodesStorage.zipCodeAlreadyRegistered(zipcode)) return;
    this.addZipCode(zipcode);
  }

  private addZipCode(zipcode: ZipCode): void {
    this.openWeatherMapService.loadWeatherInfoForZipCode(zipcode).pipe(catchError(error => {
      const errorMessage = error.error instanceof ErrorEvent ?
        `Error: ${error.error.message}` : `Error: ${error.message}`;
      this.errorSubject.next(errorMessage);
      return of(undefined);
    }))
      .subscribe(weatherInfo => {
        if (!weatherInfo) return;
        this.errorSubject.next(undefined);
        this.addWeatherInfoToList(weatherInfo);
        this.zipCodesStorage.addNewZipCodeToStore(zipcode);
      });
  }

  removeZipCode(zipcode: ZipCode): void {
    this.zipCodesStorage.removeZipCode(zipcode);
    this.zipCodesWeatherInfoSubject.next(
      this.zipCodesWeatherInfoSubject.value.filter(weatherInfo => weatherInfo.zipCode.value !== zipcode.value)
    );
  }

  private addWeatherInfoToList(weatherInfo: any) {
    const newWeatherInfo = [...this.zipCodesWeatherInfoSubject.value, weatherInfo];
    return this.zipCodesWeatherInfoSubject.next(newWeatherInfo);
  }
}
