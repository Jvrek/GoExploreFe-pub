import { AuthenticationService } from '../../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab1Service } from './tab1.service';
import { TabsService } from '../tabs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsAddService } from '../../locations/locations-add/locations-add.service';
import { IsearchCriteria } from './ISearchCriteria';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  activityTypes: any[];
  form: FormGroup;
  searchCriteria: any;
  constructor(
    private tab1Service: Tab1Service,
    private tabsService: TabsService,
    private formBulider: FormBuilder,
    private locationsAddService: LocationsAddService
  ) {}

  ngOnInit(): void {
    this.initActivitiesType();
    this.initializeForm();
  }
  private initActivitiesType() {
    this.locationsAddService.getActivityTypes().subscribe((res) => {
      this.activityTypes = res;
    });
  }
  private initializeForm() {
    this.form = this.formBulider.group({
      avgCost: ['', [Validators.required]],
      maxPeoples: [
        '',
        [Validators.required, Validators.max(5), Validators.min(1)]
      ],
      activityType: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onChangeDistance(distance: number) {
    distance = +distance;
    console.log(distance);
    this.tabsService.updateDistance(distance);
  }
  submit() {
    const searchCritera: IsearchCriteria = {
      avgCost: this.f.avgCost.value,
      maxPeoples: this.f.maxPeoples.value,
      activityType: this.f.activityType.value
    };
    this.tab1Service.saveSearchCriteria(searchCritera);
  }
}
