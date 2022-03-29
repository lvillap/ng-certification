import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteInputService } from './autocomplete-input.service';

/**
 * Interface that encapsulates the information relevant for an item
 *
 * @export
 * @interface Item
 */
export interface Item {
  id: string;
  name: string;
};

/**
 * Component that allows to select an item using autocompletion on its name
 *
 * @export
 * @class AutocompleteInputComponent
 * @implements {OnInit}
 * @implements {ControlValueAccessor}
 */
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

  /**
   * Shows or hides the items for autocompletion
   *
   * @param {*} $event raised when a key is pressed on the input
   * @memberof AutocompleteInputComponent
   */
  showOrHideAutocompleteItems($event): void {
    const textInInput: string = $event.srcElement.value;
    this.service.showOrHideAutoCompleteItemsFor(textInInput, this.items);
  }

  /**
   * Obtains the html to render an autocomplete item
   *
   * @param {Item} value item to show
   * @return {*}  {*} html code to render
   * @memberof AutocompleteInputComponent
   */
  renderAutoCompleteItem(value: Item): any {
    const currentText = this.getInputElement().value as string;
    return this.service.getRenderOfAutoCompleteItem(value, currentText);
  }

  /**
   * Selects an item as entered by the user
   *
   * @param {Item} value item to select
   * @memberof AutocompleteInputComponent
   */
  select(value: Item): void {
    this.setSelectedValue(value);
    this.onChange(value.id);
  }

  /**
   * Applies the an action when a key is pressed on the input
   *
   * @param {*} $event keydown event launched by the input
   * @memberof AutocompleteInputComponent
   */
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

  /**
   * Method used to write an item on the component (reactive forms compatibility)
   *
   * @param {*} objectToWrite item to set
   * @memberof AutocompleteInputComponent
   */
  writeValue(objectToWrite: any): void {
    this.setSelectedValue(this.items.find(i => i.id === objectToWrite));
  }

  /**
   * Method used to register the change function for the component (reactive forms compatibility)
   *
   * @param {*} onChangeFunction function to register
   * @memberof AutocompleteInputComponent
   */
  registerOnChange(onChangeFunction: any): void {
    this.onChange = onChangeFunction;
  }

  /**
   * Method used to register the touched function for the component (reactive forms compatibility)
   *
   * @param {*} onTouchedFunction function to register
   * @memberof AutocompleteInputComponent
   */
  registerOnTouched(onTouchedFunction: any): void {
    this.onTouched = onTouchedFunction;
  }

  /**
   * Method used to disable or undisable the component
   *
   * @param {boolean} isDisabled value to set (disabled or not)
   * @memberof AutocompleteInputComponent
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Sets internally (does not launch onChange) an item as the one selected
   *
   * @private
   * @param {Item} value item to set
   * @memberof AutocompleteInputComponent
   */
  private setSelectedValue(value: Item) {
    this.service.resetAutoComplete();
    const inputElement = this.getInputElement();
    if (inputElement)
      inputElement.value = value ? value.name : "";
  }

  /**
   * Gets the html input native element
   *
   * @private
   * @return {*} the native element
   * @memberof AutocompleteInputComponent
   */
  private getInputElement() {
    return this.input?.nativeElement;
  }
}
