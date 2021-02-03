import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private distance: BehaviorSubject<number>;
  constructor() {
    this.distance = new BehaviorSubject<number>(10000000000000);
  }

  updateDistance(distance: number) {
    this.distance.next(distance);
  }

  getUpdatedDistance() {
    return this.distance.asObservable();
  }
}
