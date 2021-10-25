import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value);
    console.log(loginForm.valid);
    console.log(submit);
  }

  onEmailChange(event) {
    console.log("Email changed event: ");
    console.log(event);
  }
}
