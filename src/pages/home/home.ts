import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	lat: number = 3;
  	lng: number;

  	constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  getPosition() {
  	let watch = this.geolocation.watchPosition();
  	alert(JSON.stringify(watch))
  	watch.subscribe((data) => {
  	alert(JSON.stringify(data))

  		// data can be a set of coordinates, or an error (if an error occurred).
  		this.lat = data.coords.latitude;
  		this.lng =  data.coords.longitude;
  	});
  }

}
