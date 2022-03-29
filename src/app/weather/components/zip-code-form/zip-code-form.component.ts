import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipCode } from '../../model/zipcode.model';
import { Observable } from 'rxjs';
import { allCountries } from './all-countries';
import { Item } from '../../../shared/components/autocomplete-input/autocomplete-input.component';
import { OperationState } from '../../../shared/components/state-button/state-button.component';

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

  allCountries = allCountries;

  country: Item;

  @Input() operationState: Observable<OperationState>;
  @Output() addedZipCode = new EventEmitter<ZipCode>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  /**
   * Creates the reactive form to add zip codes
   *
   * @memberof ZipCodeFormComponent
   */
  createForm(): void {
    this.form = this.fb.group({
      zipCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      countryCode: ['', [Validators.required]]
    });
  }

  /**
   * Submits the form information, emitting a signal with the zip code to add, and cleans the form
   *
   * @memberof ZipCodeFormComponent
   */
  submitZipCode(): void {
    const data = this.form.value;
    this.addedZipCode.emit(new ZipCode(data.zipCode, data.countryCode));
    this.cleanForm();
  }

  /**
   * Cleans the form
   *
   * @private
   * @memberof ZipCodeFormComponent
   */
  private cleanForm() {
    this.form.reset({ zipCode: '', countryCode: undefined });
  }

}
