import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsuriosPage } from './usurios.page';

describe('UsuriosPage', () => {
  let component: UsuriosPage;
  let fixture: ComponentFixture<UsuriosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuriosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
