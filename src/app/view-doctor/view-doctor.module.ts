import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDoctorPageRoutingModule } from './view-doctor-routing.module';

import { ViewDoctorPage } from './view-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDoctorPageRoutingModule
  ],
  declarations: [ViewDoctorPage]
})
export class ViewDoctorPageModule {}
