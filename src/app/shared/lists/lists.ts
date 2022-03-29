/**
 * Utility class that provides methods for list manipulation
 *
 * @export
 * @class Lists
 */
export class Lists {

    /**
     * Returns the next element (increments the step) in a list treating it as a circular collection
     *
     * @static
     * @template T
     * @param {T[]} items list to use
     * @param {T} item that serves as source for next element calculation
     * @param {number} [step=1] number of items to increment or decrement
     * @return {*} next item
     * @memberof Lists
     */
    static getCircularNext<T>(items: T[], item: T, step: number = 1) {
        const currentSelectedIndex = items.indexOf(item);
        const tentativeIndex = currentSelectedIndex + step;
        const realIndex = tentativeIndex >= 0 ? 
          tentativeIndex % items.length:
          items.length - Math.abs(tentativeIndex);
        return items[realIndex];
    }
}