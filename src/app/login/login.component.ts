import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public initialValues = {
    email: "hello@gmail.com",
    password: "123456",
  };

  constructor() {}

  ngOnInit() {}

  login(loginForm: NgForm, submit) {
    console.log(`loginForm.value: ${loginForm.value}`);
    console.log(`loginForm.valid: ${loginForm.valid}`);
    console.log("submit: ", submit);
    console.log("initialValues: ", this.initialValues);
  }

  onEmailChange(event) {
    console.log("Email changed event: ");
    console.log(event);
  }
}
