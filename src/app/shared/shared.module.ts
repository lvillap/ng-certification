import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateButtonComponent } from './components/state-button/state-button.component';
import { ReadyStateDirective } from './components/state-button/ready-state.directive';
import { WorkingStateDirective } from './components/state-button/working-state.directive';
import { DoneStateDirective } from './components/state-button/done-state.directive';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';

@NgModule({
  declarations: [
    StateButtonComponent,
    ReadyStateDirective,
    WorkingStateDirective,
    DoneStateDirective,
    AutocompleteInputComponent
  ],
  exports: [
    StateButtonComponent,
    ReadyStateDirective,
    WorkingStateDirective,
    DoneStateDirective,
    AutocompleteInputComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
