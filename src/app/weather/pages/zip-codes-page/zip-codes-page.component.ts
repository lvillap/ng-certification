import { Component, OnInit, OnDestroy } from '@angular/core';
import { ZipCodesPageService } from './zip-codes-page.service';
import { Subscription } from 'rxjs';
import { OperationState } from 'app/shared/components/state-button/state-button.component';

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

  subscriptions: Subscription[] = [];
  loadingState: OperationState;

  constructor(public service: ZipCodesPageService) { }

  ngOnInit(): void {
    this.service.init();
    this.subscriptions.push(
      this.service.addZipState.subscribe(state => this.loadingState = state)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
