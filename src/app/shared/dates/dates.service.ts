import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  sameDay(previousDay: Date, day: Date) {
    return previousDay.getDate() === day.getDate() &&
      previousDay.getMonth() === day.getMonth() &&
      previousDay.getFullYear() === day.getFullYear();
  }
}
