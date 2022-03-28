import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Lists } from '../../lists/lists';

export interface Item {
  id: string;
  name: string;
};

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.css']
})
export class AutocompleteInputComponent implements OnInit, OnChanges {

  @Input() selectedItem: Item | undefined;
  @Output() selectedItemChange = new EventEmitter<Item>();
  @Input() placeholder: string = "...";
  @Input() items: Item[] = [];

  @ViewChild("textInput") input: ElementRef;
  autocompleting: boolean = false;
  highlightedItem: Item | undefined;

  filteredValues: Item[];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem) {
      const selectedItem = changes.selectedItem.currentValue;
      if (selectedItem)
        this.renderItem(selectedItem);
    }
  }

  autocompleteItems($event): void {
    const textInInput: string = $event.srcElement.value;
    if (!textInInput || textInInput.trim() === "") {
      this.autocompleting = false;
      return;
    }
    this.autocompleting = true;
    this.filteredValues = this.refreshAutocompletion(this.items, textInInput.toLowerCase());
  }

  refreshAutocompletion(values: Item[], text: any): Item[] {
    this.highlightedItem = undefined;
    return values.filter(v => v.name.toLowerCase().startsWith(text))
  }

  getRenderedValue(value: Item): any {
    const currentValue = this.getInputElement().value as string;
    const valueName = value.name;
    const highlighted = valueName.substring(0, currentValue.length);
    const regular = valueName.substring(currentValue.length);
    return this.sanitizer.bypassSecurityTrustHtml(`<strong>${highlighted}</strong>${regular}`);
  }

  select(value: Item): void {
    this.selectedItem = value;
    this.renderItem(value);
    this.autocompleting = false;
    this.highlightedItem = undefined;
  }

  keyDownOnInput($event): void {
    if ($event.key === "ArrowDown") {
      this.moveSelection(1);
    }
    if ($event.key === "ArrowUp") {
      this.moveSelection(-1);
    }
    if ($event.key === "Enter" && this.highlightedItem) {
      this.select(this.highlightedItem);
    }
  }

  private moveSelection(step: number) {
    this.highlightedItem = Lists.getNext(this.filteredValues, this.highlightedItem, step);
  }

  private getInputElement() {
    return this.input.nativeElement;
  }

  private renderItem(selectedItem: any) {
    this.getInputElement().value = selectedItem.name;
  }
}
