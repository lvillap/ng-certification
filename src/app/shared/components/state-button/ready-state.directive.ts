import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive to show the 'ready' state in a state button
 *
 * @export
 * @class ReadyStateDirective
 */
@Directive({
    selector: '[readyState]'
})
export class ReadyStateDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}