import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsearchCriteria } from './ISearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {
  private baseUrl = `${environment.baserUrl}${environment.port}/api`;
  private searchCriteria: BehaviorSubject<IsearchCriteria>;

  constructor(private http: HttpClient) {
    this.searchCriteria = new BehaviorSubject<IsearchCriteria>({
      avgCost: null,
      maxPeoples: null,
      activityType: null
    });
  }

  public getActivityTypes(): Observable<Array<String>> {
    return this.http.get<Array<String>>(`${this.baseUrl}/activity-types`);
  }

  public getSearchCriteria(): Observable<IsearchCriteria> {
    return this.searchCriteria.asObservable();
  }

  public saveSearchCriteria(data: IsearchCriteria) {
    if (data.activityType == '') {
      data.activityType = null;
    }
    this.searchCriteria.next(data);
  }
}
