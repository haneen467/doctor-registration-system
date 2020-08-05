import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";

import {
  NavController,
  ToastController,
  AlertController
} from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  loading: Boolean = false;

  constructor(
    public route: Router,
    public nav: NavController,
    public toast: ToastController,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public alertController: AlertController,
    public gps: Geolocation
  ) {}

  ngOnInit() {}

  async toastPres() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "قم بملئ جميع الحقول"
    });
    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "خطأ",
      message: "تأكد من المعلومات المدخلة",
      buttons: ["اغلاق"]
    });

    await alert.present();
  }

  async doneCreated() {
    const alert = await this.alertController.create({
      header: "تم انشاء الحساب",
      message: "تم انشاء حسابك تستطيع تسجيل الدخول الان",
      buttons: [
        {
          text: "دخول",
          handler: () => {
            this.nav.pop();
          }
        }
      ]
    });

    await alert.present();
  }

  register(fullname, name, email, pass) {
    if (name.length > 0 && email.length > 0 && pass.length >= 6) {
      this.loading = true;
      var char = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v"
      ];
      var rand1 = Math.floor(Math.random() * char.length);
      var rand2 = Math.floor(Math.random() * char.length);
      var rand3 = Math.floor(Math.random() * char.length);
      var rand4 = Math.floor(Math.random() * char.length);
      var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

      this.auth.auth
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          this.gps.getCurrentPosition().then(res => {
            this.db.list("users").push({
              id: rand,
              email: email,
              fullname: fullname,
              username: name,
              doctor: false,
              lng: res.coords.longitude,
              lat: res.coords.latitude
            });
          });
          this.nav.navigateRoot("tabs/tab1");
        })
        .catch(err => {
          this.loading = false;
          this.presentAlert();
        });
    } else {
      this.toastPres();
    }
  }

  login() {
    this.nav.pop();
  }
}
