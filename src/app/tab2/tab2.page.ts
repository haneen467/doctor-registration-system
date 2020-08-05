import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  items: Array<any> = [];
  nodata: Boolean = false;
  isDoctor: Boolean = false;
  notlogin: Boolean = false;
  loading: Boolean = true;
  constructor(
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public alert: AlertController,
    public toast: ToastController
  ) {
    auth.authState.subscribe(user => {
      if (user != undefined) {
        this.notlogin = false;
        console.log(user.email);

        db.list("users", ref => ref.orderByChild("email").equalTo(user.email))
          .valueChanges()
          .subscribe(userinfo => {
            if (userinfo[0]["doctor"]) {
              this.isDoctor = true;
              db.list("booking", ref =>
                ref.orderByChild("doctorEmail").equalTo(user.email)
              )
                .snapshotChanges()
                .subscribe(data => {


                  if (data.length == 0) {
                    this.nodata = true;
                  } else {

                    this.nodata = false;
                  }

                  this.loading = false

                  this.items = data;
                });
            } else {
              db.list("booking", ref =>
                ref.orderByChild("userEmail").equalTo(user.email)
              )
                .snapshotChanges()
                .subscribe(data => {
                  console.log(data);

                  if (data.length == 0) {
                    this.nodata = true;
                    this.loading = false;
                  } else {
                    this.loading = false;
                    this.nodata = false;
                  }

                  this.items = data;
                });
            }
          });
      } else {
        this.notlogin = true;
      }
    });
  }

  async toastPres() {
    let toast = await this.toast.create({
      message: "تم حذف الحجز",
      duration: 2000
    });
    await toast.present();
  }

  async aprovePres(text) {
    let toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    await toast.present();
  }


  async delete(key) {
    let alert = await this.alert.create({
      subHeader: "حذف الحجز",
      message: "سيتم الغاء الحجز الخاص بك",
      buttons: [
        {
          text: "حذف",
          handler: () => {
            this.toastPres();
            this.db
              .list("booking")
              .remove(key)
              .then(() => { });
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


  accept(item) {
    var data = item.payload.val();
    this.db.list("booking").update(item.key, {
      status: "accept"
    }).then(() => {
      this.db.list("clients").push({
        doctorEmail: data["doctorEmail"],
        doctorName: data["doctorName"],
        userEmail: data["userEmail"],
        userName: data["userName"],
        doctorAbout: data["doctorAbout"],
        date: data["date"],
        rajita: "لم يتم التعيين"
      }).then(() => {
        this.aprovePres("تم الموافقة على الحجز")

      })
    })
  }

  reject(key) {
    this.db.list("booking").update(key, {
      status: "reject"
    }).then(() => {
      this.aprovePres("تم رفظ الحجز")
    })
  }

}
