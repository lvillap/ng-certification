import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherInfo } from "./weather-info.model";
import { ZipCode } from "./zipcode.model";

export class ZipCodesWeatherList {

    private zipCodesWeatherInfoSubject = new BehaviorSubject<WeatherInfo[]>([]);
    zipCodesWeatherInfo = this.zipCodesWeatherInfoSubject.asObservable();

    clear() {
        this.zipCodesWeatherInfoSubject.next([]);
    }

    asObservable(): Observable<WeatherInfo[]> {
        return this.zipCodesWeatherInfo;
    }

    remove(zipcode: ZipCode) {
        const weatherWithoutZipCode = this.zipCodesWeatherInfoSubject.value.filter(
            weatherInfo => weatherInfo.zipCode.value !== zipcode.value);
        this.zipCodesWeatherInfoSubject.next(weatherWithoutZipCode);
    }

    insert(weatherInfo: WeatherInfo) {
        const newWeatherInfo = [...this.zipCodesWeatherInfoSubject.value, weatherInfo];
        return this.zipCodesWeatherInfoSubject.next(newWeatherInfo);
    }
}