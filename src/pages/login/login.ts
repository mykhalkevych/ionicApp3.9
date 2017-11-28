import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor (
    public navCtrl: NavController,
    private fb: Facebook,
    private googlePlus: GooglePlus) {

  }

  fasebookLogin() {
  	this.fb.login(['public_profile', 'user_friends', 'email'])
  	.then((res) => {
      this.fb.api(`/${res.authResponse.userID}?fields=id,name,address,age_range,cover,email,gender,context`,[])
      .then(userData => {
        console.log(userData)
      })
  })
  	.catch(e => alert(e));
  }

  googleLogin() {
  	console.log('googleLogin')
    this.googlePlus.login({
      'scopes': 'profile', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '255439565679-enn1jll98pi85n2mc10rtm0atgr9417i.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  goToRegistration() {
  	this.navCtrl.push(RegistrationPage);
  }

  goToForgotPassword() {

  }

}
