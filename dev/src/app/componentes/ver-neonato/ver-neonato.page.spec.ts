import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerNeonatoPage } from './ver-neonato.page';

describe('VerNeonatoPage', () => {
  let component: VerNeonatoPage;
  let fixture: ComponentFixture<VerNeonatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerNeonatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerNeonatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
