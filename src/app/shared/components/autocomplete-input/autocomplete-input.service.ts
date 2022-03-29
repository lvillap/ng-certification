import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Lists } from '../../lists/lists';
import { Item } from './autocomplete-input.component';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteInputService {

  autocompleting: boolean = false;
  autoCompleteHighlightedItem: Item | undefined;
  filteredValues: Item[];

  constructor(private sanitizer: DomSanitizer) { }

  showOrHideAutoCompleteItemsFor(textInInput: string, items: Item[]) {
    if (!textInInput || textInInput.trim() === "") {
      this.autocompleting = false;
      return;
    }
    this.autocompleting = true;
    this.filteredValues = this.getItemsToAutoComplete(items, textInInput.toLowerCase());
  }

  getRenderOfAutoCompleteItem(value: Item, currentText: string): any {
    const autoCompleteName = value.name;
    const highlightedPart = autoCompleteName.substring(0, currentText.length);
    const regularPart = autoCompleteName.substring(currentText.length);
    return this.sanitizer.bypassSecurityTrustHtml(`<strong>${highlightedPart}</strong>${regularPart}`);
  }

  resetAutoComplete() {
    this.autocompleting = false;
    this.autoCompleteHighlightedItem = undefined;
  }

  moveSelection(step: number) {
    this.autoCompleteHighlightedItem = Lists.getCircularNext(this.filteredValues, this.autoCompleteHighlightedItem, step);
  }

  hasAutoCompleteHighlightedItem() {
    return this.autoCompleteHighlightedItem !== undefined;
  }

  private getItemsToAutoComplete(items: Item[], text: any): Item[] {
    this.autoCompleteHighlightedItem = undefined;
    return items.filter(v => v.name.toLowerCase().startsWith(text))
  }
}
