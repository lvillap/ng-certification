import { Component, OnInit, OnDestroy } from '@angular/core';
import { ZipCodesPageService } from './zip-codes-page.service';
import { interval, Subscription, map } from 'rxjs';
import { OperationState } from '../../../shared/components/state-button/state-button.component';

/**
 * Component that encapsulates the page where zip codes are managed
 *
 * @export
 * @class ZipCodesPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-zip-codes-page',
  templateUrl: './zip-codes-page.component.html',
  styleUrls: ['./zip-codes-page.component.css']
})
export class ZipCodesPageComponent implements OnInit, OnDestroy {

  private static readonly MILLISECONDS_IN_A_SECOND = 1000;
  private static readonly REFRESH_TIME = 30 * ZipCodesPageComponent.MILLISECONDS_IN_A_SECOND;

  subscriptions: Subscription[] = [];
  loadingState: OperationState;

  private weatherReloader = interval(ZipCodesPageComponent.REFRESH_TIME).pipe(
    map(() => this.service.loadZipCodesAnRetrieveWeather()));

  constructor(public service: ZipCodesPageService) { }

  ngOnInit(): void {
    this.service.init();
    this.subscriptions.push(...[
        this.service.addZipState.subscribe(state => this.loadingState = state),
        this.weatherReloader.subscribe()
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
