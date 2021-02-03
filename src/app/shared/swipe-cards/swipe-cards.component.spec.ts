import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwipeCardsComponent } from './swipe-cards.component';

describe('SwipeCardsComponent', () => {
  let component: SwipeCardsComponent;
  let fixture: ComponentFixture<SwipeCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeCardsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwipeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
