import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, of, tap, Observable, zip } from 'rxjs';
import { ZipCode } from '../../model/zipcode.model';
import { OpenWeatherMapService } from 'app/weather/services/open-weather-map.service';
import { ZipCodesLocalstorageService } from '../../services/zip-codes-localstorage.service';
import { ZipCodesWeatherList } from 'app/weather/model/zip-codes-weather-list.model';
import { WeatherInfo } from 'app/weather/model/weather-info.model';

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
    const allWeatherInfoObservables = this.zipCodes.getCurrentZipCodes().map(zipCode =>
      this.addWeatherFor(new ZipCode({ value: zipCode })));
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

  private addWeatherFor(zipcode: ZipCode): Observable<WeatherInfo> {
    return this.openWeatherMapService.loadWeatherInfoFor(zipcode).pipe(catchError(error => {
      const errorMessage = error.error instanceof ErrorEvent ?
        `Error: ${error.error.message}` : `Error: ${error.message}`;
      this.errorSubject.next(errorMessage);
      return of(undefined);
    }))
      .pipe(
        tap(weatherInfo => {
          if (!weatherInfo) return;
          this.errorSubject.next(undefined);
          this.weatherList.insert(weatherInfo);
        })
      );
  }
}
