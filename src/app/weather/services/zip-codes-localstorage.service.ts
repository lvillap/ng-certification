import { Injectable } from '@angular/core';
import { ZipCode } from '../model/zipcode.model';

@Injectable({
  providedIn: 'root'
})
export class ZipCodesLocalstorageService {

  constructor() { }

  add(zipcode: ZipCode) {
    if (this.alreadyRegistered(zipcode)) return;
    localStorage.setItem('zip-codes', JSON.stringify([...this.getCurrentZipCodes(), zipcode.value]));
  }

  alreadyRegistered(zipcode: ZipCode) {
    return this.getCurrentZipCodes().indexOf(zipcode.value) !== -1;
  }
  getCurrentZipCodes(): string[] {
    const localZipCodesData = localStorage.getItem("zip-codes");
    if (!localZipCodesData) return [];
    return JSON.parse(localZipCodesData) as string[]
  }

  remove(zipcode: ZipCode) {
    const newZipCodes = this.getCurrentZipCodes();
    const indexOfZipCode = newZipCodes.indexOf(zipcode.value);
    if (indexOfZipCode === -1) return;
    newZipCodes.splice(indexOfZipCode, 1);
    localStorage.setItem('zip-codes', JSON.stringify(newZipCodes));
  }
}
