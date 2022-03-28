import { Component, OnInit, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReadyStateDirective } from './ready-state.directive';
import { WorkingStateDirective } from './working-state.directive';
import { DoneStateDirective } from './done-state.directive';

export type OperationState = "ready" | "working" | "done";

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css']
})
export class StateButtonComponent implements OnInit {

  @ContentChild(ReadyStateDirective) readyTemplateRef!: ReadyStateDirective;
  @ContentChild(WorkingStateDirective) workingTemplateRef!: WorkingStateDirective;
  @ContentChild(DoneStateDirective) doneTemplateRef!: DoneStateDirective;

  @Output() clicked = new EventEmitter<void>();
  @Input() disabled = false;
  @Input() state: Observable<OperationState>;

  private subscriptions: Subscription[] = [];
  stateToShow: OperationState;

  constructor() { }

  ngOnInit(): void {
    if (this.state)
    this.subscriptions.push(
      this.state.subscribe(value => this.stateToShow = value)
    )
  }

  sendClick(): void {
    if (this.disabled) return;
    this.clicked.emit();
  }
}
