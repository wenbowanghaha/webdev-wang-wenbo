import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/User";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // to access the template reference variable
  @ViewChild("loginForm") form: NgForm;

  // form properties
  username: string; // accessed from ngForm property
  password: string; // accessed from ngForm property
  errorFlag: boolean;
  errorMsg = "Invalid username or password!";
  private _bgColor = "green";

  constructor(private _router: Router, private _userService: UserService) {
    this.errorFlag = false;
  }

  login() {
    // firstly, access the entered form data from form reference variable
    this.username = this.form.value.username;
    this.password = this.form.value.password;
    console.log(this.username);
    console.log(this.password);
    // secondly, decide if the entered data match via the credential service, UserService
    this._userService
      .findUserByCredentials(this.username, this.password)
      .subscribe(
        user => {
          console.log("login() return: ");
          console.log(user);
          if (user) {
            console.log('Login successful!');
            this.errorFlag = false;
            this._router.navigate(["/user", user._id]);
          } else {
            console.log('Login failed!');
            this.errorFlag = true;
          }
        },
        error => {
          console.log(error.message || "User not found while loging in...");
          this.errorFlag = true;
        }
      );
  }

  // use constructor to import services basically, but not use it as much as to
  // load bunch of things when the component is loaded
  // instead use ngOnInit to load things
  ngOnInit() {}
}
