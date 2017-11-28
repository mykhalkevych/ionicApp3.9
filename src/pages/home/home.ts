import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { SMS } from '@ionic-native/sms';
import { Sim } from '@ionic-native/sim';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	lat: number = 3;
  	lng: number;

  	constructor(
  		public navCtrl: NavController,
  		private geolocation: Geolocation,
  		private admobFree: AdMobFree,
  		private sms: SMS,
  		private sim: Sim) {
  }

  showAd() {
  	const bannerConfig: AdMobFreeBannerConfig = {
  		// add your config here
  		// for the sake of this example we will just use the test config
  		id: 'ca-app-pub-9908922598497091/3082375483',
  		isTesting: false
  	};

  	this.admobFree.banner.config(bannerConfig);

  	this.admobFree.banner.prepare()
  	.then(() => {

  		this.admobFree.banner.show()
  		console.log(this.admobFree.banner)
  		// banner Ad is ready
  		// if we set autoShow to false, then we will need to call the show method here
  	})
  	.catch(e => console.log(e));

  }

  removeAd() {
  	this.admobFree.banner.remove();
  }

  sendSMS() {
  	console.log(this.sms)
  	this.sms.send('+380678429472', 'ionic sms')
  }

  simInfo() {
  	this.sim.getSimInfo().then(
  		(info) => console.log('Sim info: ', info, this.sim),
  		(err) => console.log('Unable to get sim info: ', err)
  		);
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
