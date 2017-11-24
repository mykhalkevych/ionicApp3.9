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
    this.googlePlus.login({})
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  goToRegistration() {
  	this.navCtrl.push(RegistrationPage);
  }

  goToForgotPassword() {

  }

}
