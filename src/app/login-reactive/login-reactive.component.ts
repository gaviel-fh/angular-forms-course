import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // public email = new FormControl("", {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: "blur",
  // });

  // public password = new FormControl("", {
  //   validators: [
  //     Validators.required,
  //     Validators.minLength(8),
  //     createPasswordStrengthValidator(),
  //   ],
  // });

  // public form: FormGroup = new FormGroup({
  //   email: this.email,
  //   password: this.password,
  // });

  constructor(private fb: FormBuilder) {}

  public form = this.fb.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      },
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
  });

  ngOnInit() {}
}
