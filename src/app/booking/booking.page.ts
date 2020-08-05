import { Component, OnInit } from "@angular/core";
import { GoogleMap, Marker, Environment } from "@ionic-native/google-maps/ngx";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"]
})
export class BookingPage implements OnInit {
  gpsmap: GoogleMap;
  info;

  constructor(private route: ActivatedRoute, public nav: NavController) {
    this.route.queryParams.subscribe(params => {
      this.loadmap(params["lat"], params["lng"], params["workname"]);
    });
  }

  ngOnInit() {}

  back() {
    this.nav.pop();
  }

  loadmap(lat, lng, title) {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBO2q6u3sRTCWKuA6X7RFs8qvYaRt49icY",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBO2q6u3sRTCWKuA6X7RFs8qvYaRt49icY"
    });

    var map = (this.gpsmap = new GoogleMap("gpsmap", {
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 14,
        tilt: 30
      },
      controls: {
        zoom: true,
        myLocationButton: true,
        myLocation: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        zoom: true,
        rotate: true
      }
    }));

    map
      .addMarker({
        title: title,
        icon: "green",
        animation: "DROP",
        position: {
          lat: lat,
          lng: lng
        }
      })
      .then((marker: Marker) => {})
      .catch(err => {
        alert(err.message);
      });
  }
}
