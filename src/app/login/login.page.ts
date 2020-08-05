import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading: Boolean = false;

  constructor(
    public auth: AngularFireAuth,
    public nav: NavController,
    public alertController: AlertController,
    public route: Router,
    public toast: ToastController
  ) {}

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "خطأ",
      message: "البريد الالكتروني او كلمة المرور غير صحيحة",
      buttons: ["اغلاق"]
    });

    await alert.present();
  }

  async toastPres() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "قم بملئ جميع الحقول"
    });
    await toast.present();
  }

  register() {
    this.route.navigate(["register"]);
  }

  showHome() {
    this.nav.navigateRoot("tabs/tab1");
  }

  login(email, pass) {
    if (email.length > 4 && pass.length >= 6) {
      this.loading = true;
      this.auth.auth
        .signInWithEmailAndPassword(email, pass)
        .then(res => {
          this.nav.navigateRoot("tabs/tab1");
        })
        .catch(err => {
          this.loading = false;
          this.presentAlert();
          console.log(err.message);
        });
    } else {
      this.toastPres();
    }
  }
}
