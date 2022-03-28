import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[doneState]'
})
export class DoneStateDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}