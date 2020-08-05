import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDoctorPage } from './view-doctor.page';

describe('ViewDoctorPage', () => {
  let component: ViewDoctorPage;
  let fixture: ComponentFixture<ViewDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
