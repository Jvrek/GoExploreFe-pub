import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnedLocationsPage } from './owned-locations.page';

describe('LocationsPage', () => {
  let component: OwnedLocationsPage;
  let fixture: ComponentFixture<OwnedLocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnedLocationsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnedLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
