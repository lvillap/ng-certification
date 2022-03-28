import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, of, tap, Observable, interval, map } from 'rxjs';
import { ZipCode } from '../../model/zipcode.model';
import { ZipCodesLocalstorageService } from '../../services/zip-codes-localstorage.service';
import { ZipCodesWeatherList } from '../../model/zip-codes-weather-list.model';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { WeatherInfo } from '../../model/weather-info.model';
import { OperationState } from 'app/shared/components/state-button/state-button.component';

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

  private static readonly MILLISECONDS_IN_A_SECOND = 1000;
  private static readonly REFRESH_TIME = 30 * ZipCodesPageService.MILLISECONDS_IN_A_SECOND;

  private weatherList = new ZipCodesWeatherList();
  zipCodesWeatherInfo = this.weatherList.asObservable();

  private errorSubject = new BehaviorSubject<string>("");
  error = this.errorSubject.asObservable();

  private weatherReloader = interval(ZipCodesPageService.REFRESH_TIME).pipe(
    map(() => this.loadZipCodesAnRetrieveWeather()));

  private addZipStateSubject = new BehaviorSubject<OperationState>("ready");
  addZipState = this.addZipStateSubject.asObservable();

  constructor(private openWeatherMapService: OpenWeatherMapService, private zipCodes: ZipCodesLocalstorageService) { }

  /**
   * Initializates the service
   *
   * @memberof ZipCodesPageService
   */
  init(): void {
    this.loadZipCodesAnRetrieveWeather();
    this.weatherReloader.subscribe();
  }

  /**
   * Loads the zip codes from the storage and retrieves the weather for each zip code
   *
   * @memberof ZipCodesPageService
   */
  loadZipCodesAnRetrieveWeather() {
    this.weatherList.clear();
    this.createObservablesToLoadAllZipCodesWheather().subscribe();
  }

  /**
   * Saves to the storage the specified zip code (if not already present) and retrieves the weather information
   *
   * @param {ZipCode} zipcode to register
   * @memberof ZipCodesPageService
   */
  registerZipCode(zipcode: ZipCode): void {
    this.withStateRun(() => {
      if (this.zipCodes.alreadyRegistered(zipcode)) return;
      this.addWeatherFor(zipcode).subscribe(weatherInfo => {
        if (!weatherInfo) return;
        this.zipCodes.add(zipcode);
      });
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
  private createObservablesToLoadAllZipCodesWheather(): Observable<WeatherInfo[]> {
    const allWeatherInfoObservables = this.zipCodes.getCurrentZipCodes().map(
      zipCode => this.addWeatherFor(new ZipCode({ value: zipCode })));
    return forkJoin(allWeatherInfoObservables);
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

  /**
   * Executes an action, with a delay of 1000 milliseconds, 
   * enveloping it with changes in the adding state
   *
   * @private
   * @param {() => void} action action to execute
   * @memberof ZipCodesPageService
   */
  private withStateRun(action: () => void): void {
    this.addZipStateSubject.next("working");
    setTimeout(() => {
      action();
      this.addZipStateSubject.next("done");
      setTimeout(() => {
        this.addZipStateSubject.next("ready");
      }, 500);
    }, 1000);
  }
}
