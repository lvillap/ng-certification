/**
 * Encapsulates zip code information
 *
 * @export
 * @class ZipCode
 */
export class ZipCode {

    value: string;

    constructor(object?: any) {
        if (!object) return;
        this.value = object.value;
    }
}