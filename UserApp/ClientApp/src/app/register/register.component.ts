import { Component, OnInit} from '@angular/core';
import * as firebase from 'firebase'
import { User } from '../models/user';
import { UserService } from '../services/user.service';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDWAiCY38JeL-PYLMIZxQ0fxRlSZLcxnc4",
    authDomain: "testloginapp-e848f.firebaseapp.com",
    databaseURL: "https://testloginapp-e848f.firebaseio.com",
    projectId: "testloginapp-e848f",
    storageBucket: "testloginapp-e848f.appspot.com",
    messagingSenderId: "761718397862",
    appId: "1:761718397862:web:238cebdebf2967925a4d67",
    measurementId: "G-VW5RFTERY7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User; 
  title: string;
  otpSent: boolean = false
  validUser: boolean = false
  //phoneNumber = null
  otp: string
  recaptchaVerifier = null;
  confirmationResult = null;
  showGreetingsDiv = false;
  valid = false;

  constructor(private userService:UserService) {
    this.user = new User();
    this.title = 'Register';
   }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
  }

  sendOtp() {
    firebase.auth().signInWithPhoneNumber('+91'+this.user.MobileNumber, this.recaptchaVerifier)
    .then((confirmationResult) => {
  // SMS sent. Prompt user to type the code from the message, then sign the
  // user in with confirmationResult.confirm(code).
    this.confirmationResult = confirmationResult;
    this.otpSent = true;
    }).catch(err => {
      console.log(err)
    })
}

verifyOtp()  {
    this.confirmationResult.confirm(this.otp).then(user=>{
      this.otpSent = false;
      this.validUser = true;
      this.title = 'Set Password';
      console.log(user)
    }).catch(err => {
      console.log(err)
    })
  }


  savePassword(user: User) {
    this.userService.CreateUser(user).subscribe((res: User) => {
      if (res !=null)
        this.valid = true;
      this.showGreetingsDiv = true;
      },
      error =>{
        this.valid = false;
        this.showGreetingsDiv = true;
        console.log(error);
      });
  }

}
