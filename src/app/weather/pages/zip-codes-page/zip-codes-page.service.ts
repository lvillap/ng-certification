import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, of, tap, Observable } from 'rxjs';
import { ZipCode } from '../../model/zipcode.model';
import { ZipCodesLocalstorageService } from '../../services/zip-codes-localstorage.service';
import { ZipCodesWeatherList } from '../../model/zip-codes-weather-list.model';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { WeatherInfo } from '../../model/weather-info.model';

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
    this.weatherList.clear();
    const allWeatherInfoObservables = this.createObservablesToLoadAllZipCodesWheather();
    forkJoin(allWeatherInfoObservables).subscribe();
  }

  // FIXME No meter el zip code si no hay datos en openWeatherMap
  registerZipCode(zipcode: ZipCode) {
    if (this.zipCodes.alreadyRegistered(zipcode)) return;
    this.addWeatherFor(zipcode).subscribe(weatherInfo => {
      if (!weatherInfo) return;
      this.zipCodes.add(zipcode);
    });
  }

  removeZipCode(zipcode: ZipCode): void {
    this.zipCodes.remove(zipcode);
    this.weatherList.remove(zipcode);
  }

  private createObservablesToLoadAllZipCodesWheather() {
    return this.zipCodes.getCurrentZipCodes().map(
      zipCode => this.addWeatherFor(new ZipCode({ value: zipCode })));
  }

  private addWeatherFor(zipcode: ZipCode): Observable<WeatherInfo> {
    return this.openWeatherMapService.loadWeatherInfoFor(zipcode).pipe(catchError(error => {
      this.sendErrorHasOccurred(error);
      return of(undefined);
    }))
      .pipe(
        tap(weatherInfo => {
          if (!weatherInfo) return;
          this.cleanError();
          this.weatherList.insert(weatherInfo);
        })
      );
  }

  private sendErrorHasOccurred(error: any) {
    this.errorSubject.next(this.getErrorMessage(error));
  }

  private cleanError() {
    this.errorSubject.next(undefined);
  }

  private getErrorMessage(error: any) {
    return error.error instanceof ErrorEvent ?
      `Error: ${error.error.message}` : `Error: ${error.message}`;
  }
}
