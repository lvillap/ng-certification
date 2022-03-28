import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipCode } from '../../model/zipcode.model';
import { Observable, Subscription } from 'rxjs';
import { OperationState } from 'app/shared/components/state-button/state-button.component';

/**
 * Component that encapsulates the form to add zip codes
 *
 * @export
 * @class ZipCodeFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-zip-code-form',
  templateUrl: './zip-code-form.component.html',
  styleUrls: ['./zip-code-form.component.css']
})
export class ZipCodeFormComponent implements OnInit {

  @Input() operationState: Observable<OperationState>;
  @Output() addedZipCode = new EventEmitter<ZipCode>();
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  /**
   * Creates the reactive form to add zip codes
   *
   * @memberof ZipCodeFormComponent
   */
  createForm(): void {
    this.form = this.fb.group({
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  /**
   * Submits the form information, emitting a signal with the zip code to add, and cleans the form
   *
   * @memberof ZipCodeFormComponent
   */
  submitZipCode(): void {
    const data = this.form.value;
    this.addedZipCode.emit(new ZipCode({ value: data.zipCode }));
    this.cleanForm();
  }

  /**
   * Cleans the form
   *
   * @private
   * @memberof ZipCodeFormComponent
   */
  private cleanForm() {
    this.form.reset({ zipCode: '' });
  }
}
