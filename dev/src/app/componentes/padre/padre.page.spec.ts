import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PadrePage } from './padre.page';

describe('PadrePage', () => {
  let component: PadrePage;
  let fixture: ComponentFixture<PadrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PadrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
