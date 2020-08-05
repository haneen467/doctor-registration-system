import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDoctorPage } from './add-doctor.page';

describe('AddDoctorPage', () => {
  let component: AddDoctorPage;
  let fixture: ComponentFixture<AddDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
