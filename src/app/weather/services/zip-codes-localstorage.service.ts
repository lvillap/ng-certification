import { Injectable } from '@angular/core';
import { ZipCode } from '../model/zipcode.model';

/**
 * Service that encapsulates the logic to save zip codes to localstorage
 *
 * @export
 * @class ZipCodesLocalstorageService
 */
@Injectable({
  providedIn: 'root'
})
export class ZipCodesLocalstorageService {

  currentZipCodes: ZipCode[] = [];

  constructor() {
    const localZipCodesData = localStorage.getItem("zip-codes");
    const rawZipCodesData = !localZipCodesData ? [] : JSON.parse(localZipCodesData) as ZipCode[];
    this.currentZipCodes = rawZipCodesData.map(data => new ZipCode(data.value, data.country));
  }

  /**
   * Stores a zip code to the localstorage if not already in it
   *
   * @param {ZipCode} zipcode to store
   * @return {*}  {void}
   * @memberof ZipCodesLocalstorageService
   */
  add(zipcode: ZipCode): void {
    if (this.alreadyRegistered(zipcode)) return;
    this.currentZipCodes.push(zipcode);
    this.persistToStore();
  }

  /**
   * Returns tru if a zip code is already in the storage
   *
   * @param {ZipCode} zipcode to check
   * @return {*}  {boolean} true if zip code is already stored
   * @memberof ZipCodesLocalstorageService
   */
  alreadyRegistered(zipcode: ZipCode): boolean {
    return this.currentZipCodes.findIndex(z => z.isEqualTo(zipcode)) !== -1;
  }

  /**
   * Removes a zip code from the storage (does nothing if zip code not stored)
   *
   * @param {ZipCode} zipcode to remove
   * @return {*}  {void}
   * @memberof ZipCodesLocalstorageService
   */
  remove(zipcode: ZipCode): void {
    this.currentZipCodes = [ ...this.currentZipCodes.filter(z => !z.isEqualTo(zipcode))];
    this.persistToStore();
  }

  /**
   * Returns an array with all zip codes in storage
   *
   * @return {*}  {string[]} array with all zip codes
   * @memberof ZipCodesLocalstorageService
   */
  getCurrentZipCodes(): ZipCode[] {
    return [ ...this.currentZipCodes ];
  }

  /**
   * Persists the array of zip codes to localstorage
   *
   * @private
   * @memberof ZipCodesLocalstorageService
   */
  private persistToStore() {
    localStorage.setItem('zip-codes', JSON.stringify(this.currentZipCodes));
  }
}
