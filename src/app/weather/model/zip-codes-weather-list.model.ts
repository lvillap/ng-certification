import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherInfo } from "./weather-info.model";
import { ZipCode } from "./zipcode.model";

/**
 * List of zip codes with its weather info. Allows the subscription to changes via observable
 *
 * @export
 * @class ZipCodesWeatherList
 */
export class ZipCodesWeatherList {

    private zipCodesWeatherInfoSubject = new BehaviorSubject<WeatherInfo[]>([]);
    zipCodesWeatherInfo = this.zipCodesWeatherInfoSubject.asObservable();

    /**
     * Cleans the list
     *
     * @memberof ZipCodesWeatherList
     */
    clear(): void {
        this.zipCodesWeatherInfoSubject.next([]);
    }

    /**
     * Returns the observable to listen to changes on the list
     *
     * @return {*}  {Observable<WeatherInfo[]>} to subscript to
     * @memberof ZipCodesWeatherList
     */
    asObservable(): Observable<WeatherInfo[]> {
        return this.zipCodesWeatherInfo;
    }

    /**
     * Removes weather information for a zip code from the list
     *
     * @param {ZipCode} zipcode to remove
     * @memberof ZipCodesWeatherList
     */
    remove(zipcode: ZipCode) {
        const weatherWithoutZipCode = this.zipCodesWeatherInfoSubject.value.filter(
            weatherInfo => weatherInfo.zipCode.value !== zipcode.value);
        this.zipCodesWeatherInfoSubject.next(weatherWithoutZipCode);
    }

    /**
     * Adds weather information to the list
     *
     * @param {WeatherInfo} weatherInfo to remove
     * @memberof ZipCodesWeatherList
     */
    insert(weatherInfo: WeatherInfo) {
        const newWeatherInfo = [...this.zipCodesWeatherInfoSubject.value, weatherInfo];
        this.zipCodesWeatherInfoSubject.next(newWeatherInfo);
    }
}