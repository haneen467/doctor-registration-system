import { AngularFireDatabase } from "@angular/fire/database";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import {
  NavController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-view-doctor",
  templateUrl: "./view-doctor.page.html",
  styleUrls: ["./view-doctor.page.scss"]
})
export class ViewDoctorPage implements OnInit {
  info;
  loading: Boolean = false;
  customPickerOptions: any;
  myDate: [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public nav: NavController,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public toast: ToastController,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      this.info = params;
    });

    this.customPickerOptions = {
      buttons: [
        {
          text: "حفظ",
          handler: data => {
            this.myDate = data;
          }
        },
        {
          text: "الغاء"
        }
      ]
    };
  }

  goback() {
    this.nav.pop();
  }

  async toastPres() {
    let toast = await this.toast.create({
      message: "تم حجز الطبيب",
      duration: 2000
    });
    await toast.present();
  }


  async isDoctor() {
    let toast = await this.toast.create({
      message: "يجب ان يكون حسابك مستخدم عادي ",
      duration: 2000
    });
    await toast.present();
  }

  async toastNoTime() {
    let toast = await this.toast.create({
      message: "قم بأختيار الوقت",
      duration: 2000
    });
    await toast.present();
  }

  async notLogin() {
    const alert = await this.alertController.create({
      header: "سجل الدخول",
      message: "يجب عليك تسجيل الدخول لحجز الطبيب",
      buttons: [
        {
          text: "تسجيل",
          handler: () => {
            this.nav.navigateRoot("/login");
          }
        },
        {
          text: "الغاء",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        }
      ]
    });
    await alert.present();
  }

  book() {
    var sub3 = this.auth.authState.subscribe(user => {
      if (user == undefined) {
        sub3.unsubscribe();
        this.notLogin();
      } else {
        sub3.unsubscribe();
        if (this.myDate == null) {
          this.toastNoTime();
        } else {
          var d = new Date();

          const monthNames = [
            "يناير",
            "فبراير",
            "مارس",
            "ابريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر"
          ];

          this.loading = true;
          var sub = this.db
            .list("users", ref =>
              ref
                .orderByChild("email")
                .equalTo(this.auth.auth.currentUser.email)
            )
            .valueChanges()
            .subscribe(data => {

              if (data[0]["doctor"]) {
                this.isDoctor();
                this.loading = false;
                sub.unsubscribe;
              } else {
                var sub2 = this.db
                  .list("users", ref =>
                    ref.orderByChild("email").equalTo(this.info.email)
                  )
                  .valueChanges()
                  .subscribe(docInfo => {
                    this.db
                      .list("booking")
                      .push({
                        date:
                          d.getFullYear() +
                          "/" +
                          d.getDate() +
                          "/" +
                          monthNames[d.getMonth()],
                        doctorName: this.info.fullname,
                        doctorEmail: this.info.email,
                        userName: data[0]["fullname"],
                        userEmail: data[0]["email"],
                        doctorAbout: docInfo[0]["about"],
                        doctorSpel: docInfo[0]["spel"],
                        workname: docInfo[0]["workname"],
                        status: "pending",
                        time:
                          this.myDate["hour"]["value"] +
                          ":" +
                          this.myDate["minute"]["value"]
                      })
                      .then(() => {
                        sub.unsubscribe();
                        this.toastPres();
                        sub2.unsubscribe();
                        this.loading = false;
                        this.nav.navigateRoot("/tabs/tab2");
                      })
                      .catch(err => {
                        this.loading = false;
                        sub2.unsubscribe();
                        sub.unsubscribe();
                      });
                  });
              }


            });
        }
      }
    });
  }

  openlocation(lat, lng, workname) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        lat: lat,
        lng: lng,
        workname: workname
      }
    };
    this.router.navigate(["/booking"], navigationExtras);
  }

  ngOnInit() { }
}
