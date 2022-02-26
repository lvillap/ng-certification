import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, of, tap, Observable } from 'rxjs';
import { ZipCode } from '../../model/zipcode.model';
import { ZipCodesLocalstorageService } from '../../services/zip-codes-localstorage.service';
import { ZipCodesWeatherList } from '../../model/zip-codes-weather-list.model';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { WeatherInfo } from '../../model/weather-info.model';

/**
 * Service class that contains the business logic of Zip codes page
 *
 * @export
 * @class ZipCodesPageService
 */
@Injectable({
  providedIn: 'root'
})
export class ZipCodesPageService {

  private weatherList = new ZipCodesWeatherList();
  zipCodesWeatherInfo = this.weatherList.asObservable();

  private errorSubject = new BehaviorSubject<string>("");
  error = this.errorSubject.asObservable();

  constructor(private openWeatherMapService: OpenWeatherMapService, private zipCodes: ZipCodesLocalstorageService) { }

  /**
   * Initializates the service
   *
   * @memberof ZipCodesPageService
   */
  init(): void {
    this.loadZipCodesAnRetrieveWeather();
  }

  /**
   * Loads the zip codes from the storage and retrieves the weather for each zip code
   *
   * @memberof ZipCodesPageService
   */
  loadZipCodesAnRetrieveWeather() {
    this.weatherList.clear();
    const allWeatherInfoObservables = this.createObservablesToLoadAllZipCodesWheather();
    forkJoin(allWeatherInfoObservables).subscribe();
  }

  /**
   * Saves to the storage the specified zip code (if not already present) and retrieves the weather information
   *
   * @param {ZipCode} zipcode to register
   * @memberof ZipCodesPageService
   */
  registerZipCode(zipcode: ZipCode): void {
    if (this.zipCodes.alreadyRegistered(zipcode)) return;
    this.addWeatherFor(zipcode).subscribe(weatherInfo => {
      if (!weatherInfo) return;
      this.zipCodes.add(zipcode);
    });
  }

  /**
   * Remover a zip code from the storage if it exists, and removes the correspondant weather information
   *
   * @param {ZipCode} zipcode to remove
   * @memberof ZipCodesPageService
   */
  removeZipCode(zipcode: ZipCode): void {
    this.zipCodes.remove(zipcode);
    this.weatherList.remove(zipcode);
  }

  /**
   * Generates an array of all the observables needed to retrieve all the weather information for all zip codes
   *
   * @private
   * @return {*}  {Observable<WeatherInfo>[]} list of observables
   * @memberof ZipCodesPageService
   */
  private createObservablesToLoadAllZipCodesWheather(): Observable<WeatherInfo>[] {
    return this.zipCodes.getCurrentZipCodes().map(
      zipCode => this.addWeatherFor(new ZipCode({ value: zipCode })));
  }

  /**
   * Gets an observable to the operation that adds the weather for a zip code
   *
   * @private
   * @param {ZipCode} zipcode to retrieve weather information to
   * @return {*}  {Observable<WeatherInfo>} observable to the operation of retrieval
   * @memberof ZipCodesPageService
   */
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

  /**
   * Sends the error message to be shown
   *
   * @private
   * @param {*} error to show
   * @memberof ZipCodesPageService
   */
  private sendErrorHasOccurred(error: any): void {
    this.errorSubject.next(this.getErrorMessage(error));
  }

  /**
   * Cleans the error to show
   *
   * @private
   * @memberof ZipCodesPageService
   */
  private cleanError(): void {
    this.errorSubject.next(undefined);
  }

  /**
   * Retrieves the message from an error
   *
   * @private
   * @param {*} error object to retrieve the message from
   * @return {*}  {string} message of the error
   * @memberof ZipCodesPageService
   */
  private getErrorMessage(error: any): string {
    return error.error instanceof ErrorEvent ?
      `Error: ${error.error.message}` : `Error: ${error.message}`;
  }
}
