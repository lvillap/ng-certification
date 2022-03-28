import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateButtonComponent } from './components/state-button/state-button.component';

@NgModule({
  declarations: [
    StateButtonComponent
  ],
  exports: [
    StateButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
