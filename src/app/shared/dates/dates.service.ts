import { Injectable } from '@angular/core';

/**
 * Service that provides useful date operations
 *
 * @export
 * @class DatesService
 */
@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  /**
   * Checks if two dates are in the same day of the year
   *
   * @param {Date} date1 to check
   * @param {Date} date2 to check
   * @return {*}  {boolean} true if the two dates are in the same day
   * @memberof DatesService
   */
  sameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }
}
