/**
 * Encapsulates zip code information
 *
 * @export
 * @class ZipCode
 */
export class ZipCode {

    constructor(public value: string, public country: string) {
    }

    isEqualTo(another: ZipCode): boolean {
        return another && another.value === this.value && another.country === this.country;
    }
}