import { AngularFireDatabase } from "@angular/fire/database";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import * as firebase from "firebase/app";

@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.page.html",
  styleUrls: ["./add-doctor.page.scss"]
})
export class AddDoctorPage implements OnInit {
  constructor(
    public nav: NavController,
    public toast: ToastController,
    public db: AngularFireDatabase,
    private camera: Camera,
    public loadingctrl: LoadingController
  ) {}

  loading: Boolean = false;
  mySelectedPhoto;
  loadingimg: Boolean = false;
  imgurl;

  ngOnInit() {}

  async toastPres() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "قم بملئ جميع الحقول"
    });
    await toast.present();
  }

  async exists() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "الطبيب موجود بلفعل"
    });
    await toast.present();
  }

  async uploadedImg() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "تم رفع الصورة"
    });
    await toast.present();
  }

  async addedDoc() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "تم اضافة الطبيب"
    });
    await toast.present();
  }

  async noUser() {
    const toast = await this.toast.create({
      duration: 2000,
      message: "اسم المستخدم غير موجود"
    });
    await toast.present();
  }

  adddoc(username, spel, workname, about) {
    this.loading = true;
    if (
      username.length > 0 &&
      spel.length > 0 &&
      workname.length > 0 &&
      about.length > 0
    ) {
      this.db
        .list("users", ref => ref.orderByChild("username").equalTo(username))
        .snapshotChanges()
        .subscribe(data => {
          if (data.length > 0) {
            if (data[0].payload.val()["doctor"]) {
              this.exists();
              this.loading = false;
            } else {
              this.db
                .list("users")
                .update(data[0].key, {
                  doctor: true,
                  spel: spel,
                  workname: workname,
                  about: about,
                  img: this.imgurl
                })
                .then(() => {
                  this.addedDoc();
                  this.nav.navigateRoot("/tabs/tab1");
                })
                .catch(err => {
                  this.loadingimg = false;
                  alert(JSON.stringify(err));
                });
            }
          } else {
            this.noUser();
            this.loading = false;
          }
        });
    } else {
      this.toastPres();
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      targetHeight: 720,
      targetWidth: 720,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.mySelectedPhoto = this.dataURLtoBlob(
          "data:image/jpeg;base64," + imageData
        );
        this.upload();
      },
      err => {
        alert(JSON.stringify(err));
      }
    );
  }

  dataURLtoBlob(myURL) {
    let binary = atob(myURL.split(",")[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  upload() {
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

    if (this.mySelectedPhoto) {
      this.loadingimg = true;
      var uploadTask = firebase
        .storage()
        .ref()
        .child("images/" + rand + ".jpg");
      var put = uploadTask.put(this.mySelectedPhoto);
      put.then(() => {
        this.loadingimg = false;
        this.uploadedImg();
        uploadTask.getDownloadURL().then(url => {
          this.imgurl = url;
        });
      });

      put.catch(err => {
        this.loadingimg = false;
        alert(JSON.stringify(err));
      });
    }
  }
}
