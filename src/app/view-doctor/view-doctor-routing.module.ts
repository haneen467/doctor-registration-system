import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDoctorPage } from './view-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDoctorPageRoutingModule {}
