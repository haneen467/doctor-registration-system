import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage {
  admin: Boolean = false;
  doctor: Boolean = false;
  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, ) {
    auth.authState.subscribe(user => {
      if (user != undefined) {
        if (user.email == "admin@admin.com") {
          this.admin = true;
        }

        db.list("users", ref => ref.orderByChild("email").equalTo(user.email))
          .valueChanges()
          .subscribe(userinfo => {
            if (userinfo[0]["doctor"]) {
              this.doctor = true;
            }

          });


      }
    });
  }
}
