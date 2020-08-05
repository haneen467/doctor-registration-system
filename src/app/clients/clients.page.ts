import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  items: Array<any> = [];
  nodata: Boolean = false;
  isDoctor: Boolean = false;
  notlogin: Boolean = false;
  loading: Boolean = true;
  myar = [];

  constructor(public db: AngularFireDatabase,
    public auth: AngularFireAuth, public alert: AlertController,
    public toast: ToastController) {



    auth.authState.subscribe(user => {
      if (user != undefined) {
        this.notlogin = false;

        db.list("users", ref => ref.orderByChild("email").equalTo(user.email))
          .valueChanges()
          .subscribe(userinfo => {
            if (userinfo[0]["doctor"]) {
              this.isDoctor = true;
              db.list("clients", ref =>
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

                  this.items = data.slice().reverse();
                  this.myar = data.slice().reverse();
                });
            } else {
              db.list("clients", ref =>
                ref.orderByChild("userEmail").equalTo(user.email)
              )
                .snapshotChanges()
                .subscribe(data => {

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

  async editedRajita() {
    let toast = await this.toast.create({
      message: "تم حفظ الراجيتة",
      duration: 2000
    });
    await toast.present();
  }

  async deleteRajita() {
    let toast = await this.toast.create({
      message: "تم حذف الراجيتة",
      duration: 2000
    });
    await toast.present();
  }


  async showPrompt(message, key) {
    const prompt = await this.alert.create({
      header: "تعديل الراجيتة",
      message: message,
      inputs: [
        {
          name: 'title',
          placeholder: 'الراجيتة'
        },
      ],
      buttons: [
        {
          text: 'تعديل',
          handler: data => {
            this.db.list("clients").update(key, {
              rajita: data.title
            }).then(() => {
              this.editedRajita();
            })
          }
        },
        {
          text: 'الغاء',
          cssClass: "color-danger",
          handler: data => {
          }
        }
      ]
    });
    await prompt.present();
  }

  async showRajeta(message) {
    const prompt = await this.alert.create({
      header: "الراجيتة",
      message: message,

      buttons: [

        {
          text: 'اغلاق',
          cssClass: "color-danger",
          handler: data => {
          }
        }
      ]
    });
    await prompt.present();
  }

  async delete(key) {
    let alert = await this.alert.create({
      subHeader: "حذف المراجع",
      message: "سيتم حذف المراجع",
      buttons: [
        {
          text: "حذف",
          handler: () => {
            this.deleteRajita();
            this.db
              .list("clients")
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



  initializeItems() {
    this.items = this.myar;
  }

  getItems(ev: any) {
    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.items = this.items.filter(item => {
        return (
          item.payload
            .val()
            .userName.toLowerCase()
            .indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  edit(item) {
    var rajeta = item.payload.val().rajita;
    this.showPrompt(rajeta, item.key);
  }

  ngOnInit() {
  }

}
