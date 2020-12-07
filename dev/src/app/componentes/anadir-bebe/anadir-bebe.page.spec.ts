import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnadirBebePage } from './anadir-bebe.page';

describe('AnadirBebePage', () => {
  let component: AnadirBebePage;
  let fixture: ComponentFixture<AnadirBebePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirBebePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirBebePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
