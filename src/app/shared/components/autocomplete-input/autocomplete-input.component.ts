import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteInputService } from './autocomplete-input.service';

export interface Item {
  id: string;
  name: string;
};

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutocompleteInputComponent
    },
    AutocompleteInputService
  ]
})
export class AutocompleteInputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string = "...";
  @Input() items: Item[] = [];
  @ViewChild("textInput") input: ElementRef;

  disabled: boolean;
  onChange: (id: string) => {};
  onTouched: () => {};

  constructor(public service: AutocompleteInputService) { }

  ngOnInit(): void {
  }

  showOrHideAutocompleteItems($event): void {
    const textInInput: string = $event.srcElement.value;
    this.service.showOrHideAutoCompleteItemsFor(textInInput, this.items);
  }

  renderAutoCompleteItem(value: Item): any {
    const currentText = this.getInputElement().value as string;
    return this.service.getRenderOfAutoCompleteItem(value, currentText);
  }

  select(value: Item): void {
    this.setSelectedValue(value);
    this.onChange(value.id);
  }

  keyDownOnInput($event): void {
    this.onTouched();
    const pressedKey = $event.key;
    if (pressedKey === "ArrowDown")
      this.service.moveSelection(1);
    if (pressedKey === "ArrowUp")
      this.service.moveSelection(-1);
    if (pressedKey === "Enter" && this.service.hasAutoCompleteHighlightedItem())
      this.select(this.service.autoCompleteHighlightedItem);
  }

  writeValue(objectToWrite: any): void {
    this.setSelectedValue(this.items.find(i => i.id === objectToWrite));
  }

  registerOnChange(onChangeFunction: any): void {
    this.onChange = onChangeFunction;
  }

  registerOnTouched(onTouchedFunction: any): void {
    this.onTouched = onTouchedFunction;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private setSelectedValue(value: Item) {
    this.service.resetAutoComplete();
    const inputElement = this.getInputElement();
    if (inputElement)
      inputElement.value = value ? value.name : "";
  }

  private getInputElement() {
    return this.input?.nativeElement;
  }
}
