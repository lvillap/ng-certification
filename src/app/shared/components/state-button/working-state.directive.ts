import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[workingState]'
})
export class WorkingStateDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}