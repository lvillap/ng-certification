import { Component, OnInit } from '@angular/core';
import { ZipCodesPageService } from './zip-codes-page.service';

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
export class ZipCodesPageComponent implements OnInit {

  constructor(public service: ZipCodesPageService) { }

  ngOnInit(): void {
    this.service.init();
  }
}
