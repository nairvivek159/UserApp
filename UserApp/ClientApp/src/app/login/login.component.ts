import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showGreetingsDiv = false;
  valid = false;
  user: User;
  constructor(private userService:UserService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  validateUser(user: User) {
    this.userService.ValidateUser(user).subscribe((res: User) => {
      if (res != null)
        this.valid = true;
      this.showGreetingsDiv = true;
    },
      error => {
        this.valid = false;
        this.showGreetingsDiv = true;
        console.log(error);
      });
  }

}
