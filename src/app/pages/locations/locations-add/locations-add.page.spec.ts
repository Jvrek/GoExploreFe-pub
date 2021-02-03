import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationsAddPage } from './locations-add.page';

describe('LocationsAddPage', () => {
  let component: LocationsAddPage;
  let fixture: ComponentFixture<LocationsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
