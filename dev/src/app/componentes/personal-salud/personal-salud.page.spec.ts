import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalSaludPage } from './personal-salud.page';

describe('PersonalSaludPage', () => {
  let component: PersonalSaludPage;
  let fixture: ComponentFixture<PersonalSaludPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSaludPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalSaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
