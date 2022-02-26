import { Component, OnInit } from '@angular/core';
import { ZipCodesPageService } from './zip-codes-page.service';

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
