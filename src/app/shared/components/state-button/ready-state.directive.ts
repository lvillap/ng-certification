import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[readyState]'
})
export class ReadyStateDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}