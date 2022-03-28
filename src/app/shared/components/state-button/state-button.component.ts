import { Component, OnInit, Input, Output, EventEmitter, ContentChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReadyStateDirective } from './ready-state.directive';
import { WorkingStateDirective } from './working-state.directive';
import { DoneStateDirective } from './done-state.directive';

export type OperationState = "ready" | "working" | "done";

/**
 * Component that renders a button with state, supporting custom rendering for each state
 *
 * @export
 * @class StateButtonComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css']
})
export class StateButtonComponent implements OnInit, OnDestroy {

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

  /**
   * Sends a signal indicating the button has been clicked (does note emit if disabled)
   *
   * @return {*}  {void}
   * @memberof StateButtonComponent
   */
  sendClick(): void {
    if (this.disabled) return;
    this.clicked.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
