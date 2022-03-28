export class Lists {

    static getNext<T>(items: T[], item: T, step: number = 1) {
        const currentSelectedIndex = items.indexOf(item);
        const tentativeIndex = currentSelectedIndex + step;
        const realIndex = tentativeIndex >= 0 ? 
          tentativeIndex % items.length:
          items.length - Math.abs(tentativeIndex);
        return items[realIndex];
    }
}