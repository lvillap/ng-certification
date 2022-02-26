import { Injectable } from '@angular/core';
import { ZipCode } from '../model/zipcode.model';

@Injectable({
  providedIn: 'root'
})
export class ZipCodesLocalstorageService {

  constructor() { }

  addNewZipCodeToStore(zipcode: ZipCode) {
    if (this.zipCodeAlreadyRegistered(zipcode)) return;
    localStorage.setItem('zip-codes', JSON.stringify([...this.getCurrentZipCodes(), zipcode.value]));
  }

  zipCodeAlreadyRegistered(zipcode: ZipCode) {
    return this.getCurrentZipCodes().indexOf(zipcode.value) !== -1;
  }
  getCurrentZipCodes(): string[] {
    const localZipCodesData = localStorage.getItem("zip-codes");
    if (!localZipCodesData) return [];
    return JSON.parse(localZipCodesData) as string[]
  }

  removeZipCode(zipcode: ZipCode) {
    const newZipCodes = this.getCurrentZipCodes();
    const indexOfZipCode = newZipCodes.indexOf(zipcode.value);
    if (indexOfZipCode === -1) return;
    newZipCodes.splice(indexOfZipCode, 1);
    localStorage.setItem('zip-codes', JSON.stringify(newZipCodes));
  }
}
