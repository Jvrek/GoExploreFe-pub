import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectedLocationPage } from './selected-location.page';

describe('SelectedLocationPage', () => {
  let component: SelectedLocationPage;
  let fixture: ComponentFixture<SelectedLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
