import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersUnactiveListPage } from './unactive-users-list.page';

describe('UsersPage', () => {
  let component: UsersUnactiveListPage;
  let fixture: ComponentFixture<UsersUnactiveListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersUnactiveListPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUnactiveListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
