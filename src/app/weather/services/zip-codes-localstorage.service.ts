import { Injectable } from '@angular/core';
import { ZipCode } from '../model/zipcode.model';

@Injectable({
  providedIn: 'root'
})
export class ZipCodesLocalstorageService {

  currentZipCodes: string[];

  constructor() {
    const localZipCodesData = localStorage.getItem("zip-codes");
    this.currentZipCodes = !localZipCodesData ? [] : JSON.parse(localZipCodesData) as string[];
  }

  add(zipcode: ZipCode): void {
    if (this.alreadyRegistered(zipcode)) return;
    this.currentZipCodes.push(zipcode.value);
    this.persistToStore();
  }

  alreadyRegistered(zipcode: ZipCode): boolean {
    return this.currentZipCodes.indexOf(zipcode.value) !== -1;
  }

  remove(zipcode: ZipCode): void {
    const indexOfZipCode = this.currentZipCodes.indexOf(zipcode.value);
    if (indexOfZipCode === -1) return;
    this.currentZipCodes.splice(indexOfZipCode, 1);
    this.persistToStore();
  }

  getCurrentZipCodes(): string[] {
    return [ ...this.currentZipCodes ];
  }

  private persistToStore() {
    localStorage.setItem('zip-codes', JSON.stringify(this.currentZipCodes));
  }
}
