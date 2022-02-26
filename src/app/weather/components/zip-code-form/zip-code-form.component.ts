import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipCode } from '../../model/zipcode.model';

// TODO Pintar errores en formulario

@Component({
  selector: 'app-zip-code-form',
  templateUrl: './zip-code-form.component.html',
  styleUrls: ['./zip-code-form.component.css']
})
export class ZipCodeFormComponent implements OnInit {

  @Output() addedZipCode = new EventEmitter<ZipCode>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  submitZipCode(): void {
    const data = this.form.value;
    this.addedZipCode.emit(new ZipCode({ value: data.zipCode }));
    this.cleanForm();
  }

  private cleanForm() {
    this.form.reset({ zipCode: '' });
  }
}
