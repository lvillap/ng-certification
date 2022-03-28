import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive to show the 'working' state in a state button
 *
 * @export
 * @class WorkingStateDirective
 */
@Directive({
    selector: '[workingState]'
})
export class WorkingStateDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}