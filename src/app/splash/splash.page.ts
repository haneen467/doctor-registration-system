import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.page.html",
  styleUrls: ["./splash.page.scss"]
})
export class SplashPage implements OnInit {
  constructor(
    public router: Router,
    public nav: NavController,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {}
}
