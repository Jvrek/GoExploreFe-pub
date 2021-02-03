import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationPopularityDetailsPage } from './location-popularity-details.page';

describe('LocationPopularityDetailsPage', () => {
  let component: LocationPopularityDetailsPage;
  let fixture: ComponentFixture<LocationPopularityDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPopularityDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationPopularityDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
