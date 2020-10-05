import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message:string
  @Input()
  validUser: boolean;
  constructor() {
    
   }

  ngOnInit() {
    this.message = this.validUser? 'Welcome User!' : 'Invalid User!'
  }



}
