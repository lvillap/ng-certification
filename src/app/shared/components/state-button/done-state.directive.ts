import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive to show the 'done' state in a state button
 *
 * @export
 * @class DoneStateDirective
 */
@Directive({
    selector: '[doneState]'
})
export class DoneStateDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}