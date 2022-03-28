import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export type OperationState = "ready" | "working" | "done";

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css']
})
export class StateButtonComponent implements OnInit {

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
