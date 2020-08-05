import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera } from "@ionic-native/camera/ngx";

var firebaseConfig = {
  apiKey: "AIzaSyDzhF38jLIdnTcgrSGOCsr-B2ahhECvQpM",
  authDomain: "mydoctor-f3cff.firebaseapp.com",
  databaseURL: "https://mydoctor-f3cff.firebaseio.com",
  projectId: "mydoctor-f3cff",
  storageBucket: "mydoctor-f3cff.appspot.com",
  messagingSenderId: "177404714042",
  appId: "1:177404714042:web:15b43d8cdf0e488ccf2903",
  measurementId: "G-T5BYPDMGZZ"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
