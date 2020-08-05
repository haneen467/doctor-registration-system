import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },

  {
    path: "",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then(m => m.RegisterPageModule)
  },
  {
    path: "view-doctor",
    loadChildren: () =>
      import("./view-doctor/view-doctor.module").then(
        m => m.ViewDoctorPageModule
      )
  },
  {
    path: "booking",
    loadChildren: () =>
      import("./booking/booking.module").then(m => m.BookingPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
