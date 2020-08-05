import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  items: Array<any> = [];
  loading: Boolean = true;
  searchshow: Boolean = true;
  myar = [];
  isLogin: Boolean = false;
  isnotLogin: Boolean = false;

  constructor(
    public alertController: AlertController,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router,
    public nav: NavController
  ) {
    auth.authState.subscribe(user => {
      if (user != undefined) {
        this.isLogin = true;
        this.isnotLogin = false;
      } else {
        this.isnotLogin = true;
        this.isLogin = false;
      }
    });

    db.list("users", ref => ref.orderByChild("doctor").equalTo(true))
      .snapshotChanges()
      .subscribe(data => {
        this.loading = false;

        this.items = data.slice().reverse();
        this.myar = data.slice().reverse();
      });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: "خروج",
      message: "هل تريد تسجيل الخروج من التطبيق؟",
      buttons: [
        {
          text: "الغاء",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "خروج",
          handler: () => {
            this.auth.auth.signOut();
            this.nav.navigateRoot("/login");
          }
        }
      ]
    });

    await alert.present();
  }

  initializeItems() {
    this.items = this.myar;
  }

  selected(vale) {
    this.initializeItems();
    const val = vale.target.value;

    if (val == "الجميع") {
      this.items = this.myar;
    } else {
      if (val && val.trim() != "") {
        this.items = this.items.filter(item => {
          return (
            item.payload
              .val()
              .spel.toLowerCase()
              .indexOf(val.toLowerCase()) > -1
          );
        });
      }
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.items = this.items.filter(item => {
        return (
          item.payload
            .val()
            .fullname.toLowerCase()
            .indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  viewDoctor(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        img: item.payload.val()["img"],
        username: item.payload.val()["username"],
        fullname: item.payload.val()["fullname"],
        email: item.payload.val()["email"],
        spel: item.payload.val()["spel"],
        workname: item.payload.val()["workname"],
        lat: item.payload.val()["lat"],
        lng: item.payload.val()["lng"],
        about: item.payload.val()["about"]
      }
    };
    this.router.navigate(["/view-doctor"], navigationExtras);
  }
}
